<script lang="ts" setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import Sidebar from 'primevue/sidebar'
import Button from 'primevue/button'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import InputNumber from 'primevue/inputnumber'
import Message from 'primevue/message'
import { computed, ref, watch } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { faBitcoinSign, faHourglass } from '@fortawesome/free-solid-svg-icons'
import { useCryptoStore } from '~/stores/crypto'
import { format } from '~/support/format'
import type { Crypto } from '~/interfaces/crypto.interface'
const { t } = useI18n()

const cryptoStore = useCryptoStore()
cryptoStore.setCryptos()
const cryptos = cryptoStore.getCryptos

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const columns = ref<any>([
  { field: 'icon', header: t('cryptoList.icon') },
  { field: 'name', header: t('cryptoList.name') },
  { field: 'symbol', header: t('cryptoList.symbol') },
  { field: 'price', header: t('cryptoList.price') },
  { field: 'marketCap', header: t('cryptoList.marketCap') },
  { field: 'changes', header: t('cryptoList.changes') },
])

const selectedColumns = ref<any>(columns.value)
const onToggle = (val: any): void => {
  selectedColumns.value = columns.value.filter((col: any) => val.includes(col))
}

const columnIsSelected = (col: string): boolean => {
  return selectedColumns.value.some(
    (column: { field: string }) => column.field === col,
  )
}

const messages = ref<Array<any>>([])
const messageLife = ref<number>(4000)
const messageId = ref<number>(0)
const addMessages = (): void => {
  messages.value = [
    {
      severity: 'success',
      content: t('cryptoList.filtersApplied'),
      id: messageId.value++,
    },
  ]
  setTimeout((): void => {
    messages.value = []
  }, messageLife.value + 500)
}

const visibleRight = ref<boolean>(false)

const minPrice = ref<any>(null)
const maxPrice = ref<any>(null)
const minCap = ref<any>(null)
const maxCap = ref<any>(null)
const minChanges = ref<any>(null)
const maxChanges = ref<any>(null)

const displayFavorites = ref<boolean>(false)
const isFavorite = (crypto: Crypto): boolean => {
  return cryptoStore.getFavorites.includes(crypto)
}

const cryptosFiltered = computed((): Array<Crypto> => {
  let _cryptos = cryptos

  if (displayFavorites.value)
    _cryptos = cryptoStore.getFavorites

  if (minPrice.value)
    _cryptos = _cryptos.filter(crypto => crypto.price >= minPrice.value)
  if (maxPrice.value)
    _cryptos = _cryptos.filter(crypto => crypto.price <= maxPrice.value)
  if (minCap.value)
    _cryptos = _cryptos.filter(crypto => crypto.marketCap >= minCap.value)
  if (maxCap.value)
    _cryptos = _cryptos.filter(crypto => crypto.marketCap <= maxCap.value)
  if (minChanges.value)
    _cryptos = _cryptos.filter(crypto => crypto.changes >= minChanges.value)
  if (maxChanges.value)
    _cryptos = _cryptos.filter(crypto => crypto.changes <= maxChanges.value)

  return _cryptos
})

watch(cryptosFiltered, (): void => {
  addMessages()
})

const resetPriceFilter = (): void => {
  minPrice.value = null
  maxPrice.value = null
}

const resetCapFilter = (): void => {
  minCap.value = null
  maxCap.value = null
}

const resetChangesFilter = (): void => {
  minChanges.value = null
  maxChanges.value = null
}

const resetFilters = (): void => {
  resetPriceFilter()
  resetCapFilter()
  resetChangesFilter()
}
</script>

<template>
  <div>
    <DataTable
      v-model:filters="filters"
      :value="cryptosFiltered"
      :paginator="true"
      :row-hover="true"
      :rows="10"
      filter-display="menu"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :global-filter-fields="['name', 'symbol']"
      :rows-per-page-options="[10, 25, 50]"
      responsive-layout="scroll"
    >
      <template #header>
        <div class="flex flex-wrap">
          <div class="m-2">
            <span>
              <i class="pi pi-search mr-4" />
              <InputText
                v-model="filters['global'].value"
                :placeholder="t('cryptoList.search')"
              />
            </span>
          </div>
          <div class="m-2">
            <Button
              :label="t('cryptoList.filters')"
              class="p-button-outlined"
              icon="pi pi-filter"
              @click="visibleRight = true"
            />
          </div>
          <div class="m-2">
            <Button
              :label="t('cryptoList.favorites')"
              :class="displayFavorites ? '' : 'p-button-outlined'"
              icon="pi pi-star-fill"
              @click="displayFavorites = !displayFavorites"
            />
          </div>
          <div class="m-2">
            <MultiSelect
              class="w-64"
              :model-value="selectedColumns"
              :options="columns"
              option-label="header"
              :placeholder="t('cryptoList.columns')"
              @update:model-value="onToggle"
            />
          </div>
        </div>
      </template>
      <template #empty>
        <div class="text-center">
          <font-awesome-icon class="mr-1" :icon="faBitcoinSign" />
          {{ isFavorite ? t('cryptoList.emptyFavorites') : t('cryptoList.emptyCryptos') }}
        </div>
      </template>
      <template #loading>
        <font-awesome-icon class="mr-1" :icon="faHourglass" />
        {{ t('cryptoList.loading') }}
      </template>
      <Column header-style="width: 3rem">
        <template #body="{data}">
          <div class="cursor-pointer" @click="cryptoStore.setFavorite(data)">
            <i class="pi text-main-primary" :class="displayFavorites || isFavorite(data) ? 'pi-star-fill' : 'pi-star'" />
          </div>
        </template>
      </Column>
      <Column v-if="columnIsSelected('icon')" header-style="width: 7rem">
        <template #body="{ data }">
          <img class="max-h-10 mx-auto" :src="data.image" :alt="data.name">
        </template>
      </Column>
      <Column v-if="columnIsSelected('name')" field="name" :header="t('cryptoList.name')" />
      <Column
        v-if="columnIsSelected('symbol')"
        field="symbol"
        :header="t('cryptoList.symbol')"
      />
      <Column
        v-if="columnIsSelected('price')"
        field="price"
        :sortable="true"
        :header="t('cryptoList.price')"
      >
        <template #body="{ data }">
          {{ format.dollarPrice(data.price) }}
        </template>
      </Column>
      <Column
        v-if="columnIsSelected('marketCap')"
        field="marketCap"
        :sortable="true"
        :header="t('cryptoList.marketCap')"
      >
        <template #body="{ data }">
          {{ format.cap(data.marketCap) }}
        </template>
      </Column>
      <Column
        v-if="columnIsSelected('changes')"
        field="changes"
        :sortable="true"
        :header="t('cryptoList.changes')"
      >
        <template #body="{ data }">
          <div :class="data.changes >= 0 ? 'text-green' : 'text-red'">
            {{ format.percentage(data.changes) }}
          </div>
        </template>
      </Column>
    </DataTable>
    <Sidebar
      v-model:visible="visibleRight"
      class="p-sidebar-md h-100"
      position="right"
    >
      <template #header>
        <div class="absolute left-4 top-0">
          <transition-group name="p-message" tag="div">
            <Message
              v-for="msg of messages"
              :key="msg.id"
              :life="messageLife"
              :sticky="false"
              :severity="msg.severity"
              :closable="false"
            >
              {{ msg.content }}
            </Message>
          </transition-group>
        </div>
      </template>
      <div class="mt-8">
        <h2 class="font-bold text-2xl">
          {{ t('cryptoList.filters') }}
        </h2>
        <div class="my-4">
          <Accordion class="accordion-custom">
            <AccordionTab>
              <template #header>
                <i class="pi pi-dollar mr-2" />
                <span>{{ t('cryptoList.price') }}</span>
              </template>
              <div class="flex flex-wrap justify-around">
                <InputNumber
                  v-model="minPrice"
                  class="my-2 lg:my-auto"
                  placeholder="min"
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                />
                <InputNumber
                  v-model="maxPrice"
                  class="my-2 lg:my-auto"
                  placeholder="max"
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                />
                <Button
                  icon="pi pi-refresh"
                  class="p-button-rounded p-button-text p-button-plain"
                  @click="resetPriceFilter"
                />
              </div>
            </AccordionTab>
            <AccordionTab>
              <template #header>
                <i class="pi pi-flag mr-2" />
                <span>{{ t('cryptoList.marketCap') }}</span>
              </template>
              <div class="flex flex-wrap justify-around">
                <InputNumber
                  v-model="minCap"
                  class="my-2 lg:my-auto"
                  placeholder="min"
                  :min="1"
                />
                <InputNumber
                  v-model="maxCap"
                  class="my-2 lg:my-auto"
                  placeholder="max"
                  :min="1"
                />
                <Button
                  icon="pi pi-refresh"
                  class="p-button-rounded p-button-text p-button-plain"
                  @click="resetCapFilter"
                />
              </div>
            </AccordionTab>
            <AccordionTab>
              <template #header>
                <i class="pi pi-sort-alt mr-2" />
                <span>{{ t('cryptoList.changes') }}</span>
              </template>
              <div class="flex flex-wrap justify-around">
                <InputNumber
                  v-model="minChanges"
                  class="my-2 lg:my-auto"
                  placeholder="min"
                  mode="decimal"
                  :min-fraction-digits="2"
                  suffix="%"
                />
                <InputNumber
                  v-model="maxChanges"
                  class="my-2 lg:my-auto"
                  placeholder="max"
                  mode="decimal"
                  :min-fraction-digits="2"
                  suffix="%"
                />
                <Button
                  icon="pi pi-refresh"
                  class="p-button-rounded p-button-text p-button-plain"
                  @click="resetChangesFilter"
                />
              </div>
            </AccordionTab>
          </Accordion>
        </div>
      </div>
      <div class="flex flex-wrap justify-end">
        <Button
          :label="t('cryptoList.resetFilters')"
          background
          class="p-button-outlined"
          icon="pi pi-refresh"
          icon-pos="left"
          @click="resetFilters()"
        />
      </div>
    </Sidebar>
  </div>
</template>

<style scoped lang="scss">
::v-deep(.p-paginator) {
  justify-content: end;
}
</style>
