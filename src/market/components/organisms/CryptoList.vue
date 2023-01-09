<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import Sidebar from 'primevue/sidebar'
import Button from 'primevue/button'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import InputNumber from 'primevue/inputnumber'
import Message from 'primevue/message'
import { computed, ref, watch } from 'vue'
import { faBitcoinSign, faHourglass } from '@fortawesome/free-solid-svg-icons'
import { debounce } from 'lodash'
import { format } from '~/support/format'
import { useGetCryptosListQuery } from '~/common/generated/graphql'
const { t } = useI18n()

const router = useRouter()

const visibleRight = ref<boolean>(false)
const search = ref<any>('')
const totalRecords = ref(100)

const filters = ref<any>({
  minPrice: null,
  maxPrice: null,
  minCap: null,
  maxCap: null,
  rowsPerPage: 10,
  pagination: {
    start: 0,
    end: 10,
  },
  orderBy: {
    direction: null,
    name: null,
  },
})

const { result, error, loading, refetch } = useGetCryptosListQuery({
  options: {
    filterBy: {
      pagination: {
        start: filters.value.pagination.start,
        end: filters.value.pagination.end,
      },
    },
  },
})

const cryptoList = computed(() => {
  return result?.value?.cryptos ?? []
})

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

const debouncedRefetch = debounce(() => {
  return refetch({
    options: {
      filterBy: {
        pagination: {
          start: filters.value.pagination.start,
          end: filters.value.pagination.end,
        },
        search: {
          name: search.value,
          symbol: search.value,
        },
        min_current_price: filters.value.minPrice,
        max_current_price: filters.value.maxPrice,
        min_cap: filters.value.minCap,
        max_cap: filters.value.maxCap,
      },
    },
  })
}, 500)

watch(search, () => {
  debouncedRefetch()
})

watch(
  filters,
  () => {
    debouncedRefetch()
    addMessages()
  },
  { deep: true },
)

const columns = ref<any>([
  { field: 'market_cap', header: t('cryptoList.marketCap') },
  { field: 'price_change_percentage_24h', header: t('cryptoList.changes') },
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

const resetPriceFilter = (): void => {
  filters.value.minPrice = null
  filters.value.maxPrice = null
}

const resetCapFilter = (): void => {
  filters.value.minCap = null
  filters.value.maxCap = null
}

const resetFilters = (): void => {
  resetPriceFilter()
  resetCapFilter()
}

const onPage = (event: any): void => {
  filters.value.rowsPerPage = event.rows
  filters.value.pagination.start = event.first
  filters.value.pagination.end = event.first + event.rows
}

const onSort = (event: any): void => {
  if (event.sortOrder === 1)
    filters.value.orderBy.direction = 'ASC'
  else if (event.sortOrder === -1)
    filters.value.orderBy.direction = 'DESC'

  filters.value.orderBy.name = event.sortField
}

const redirect = (event: any): void => {
  router.push(`cryptos/${event.data.symbol}`)
}
</script>
<template>
  <div>
    <DataTable
      :value="cryptoList"
      :paginator="true"
      :row-hover="true"
      :rows="filters.rowsPerPage"
      filter-display="menu"
      :lazy="true"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :total-records="totalRecords"
      :rows-per-page-options="[10, 25, 50]"
      responsive-layout="scroll"
      :loading="!!loading"
      :row-style="'cursor: pointer'"
      @page="onPage"
      @sort="onSort"
      @row-click="redirect"
    >
      <template #header>
        <div class="flex flex-wrap">
          <div class="m-2">
            <span>
              <i class="pi pi-search mr-4" />
              <InputText
                v-model="search"
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
              :class="false ? '' : 'p-button-outlined'"
              icon="pi pi-star-fill"
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
          {{
            false
              ? t("cryptoList.emptyFavorites")
              : t("cryptoList.emptyCryptos")
          }}
        </div>
      </template>
      <template #loading>
        <font-awesome-icon class="mr-1" :icon="faHourglass" />
        {{ t("cryptoList.loading") }}
      </template>
      <Column header-style="width: 3rem">
        <template #body="{ data }">
          <div class="cursor-pointer">
            <i
              class="pi text-main-primary"
              :class="false ? 'pi-star-fill' : 'pi-star'"
            />
          </div>
        </template>
      </Column>
      <Column header-style="width: 7rem">
        <template #body="{ data }">
          <img class="max-h-10 mx-auto" :src="data.image" :alt="data.name">
        </template>
      </Column>
      <Column field="name" :header="t('cryptoList.name')" />
      <Column field="symbol" :header="t('cryptoList.symbol')">
        <template #body="{ data }">
          {{ data.symbol.toUpperCase() }}
        </template>
      </Column>
      <Column
        field="current_price"
        :sortable="true"
        :header="t('cryptoList.price')"
      >
        <template #body="{ data }">
          {{ format.dollarPrice(data.current_price) }}
        </template>
      </Column>
      <Column
        v-if="columnIsSelected('market_cap')"
        field="market_cap"
        :sortable="true"
        :header="t('cryptoList.marketCap')"
      >
        <template #body="{ data }">
          {{ format.cap(data.market_cap) }}
        </template>
      </Column>
      <Column
        v-if="columnIsSelected('price_change_percentage_24h')"
        field="price_change_percentage_24h"
        :sortable="true"
        :header="t('cryptoList.changes')"
      >
        <template #body="{ data }">
          <div
            :class="
              data.price_change_percentage_24h >= 0
                ? 'text-success'
                : 'text-error'
            "
          >
            {{ format.percentage(data.price_change_percentage_24h) }}
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
          {{ t("cryptoList.filters") }}
        </h2>
        <div class="my-4">
          <Accordion :multiple="true" class="accordion-custom">
            <AccordionTab>
              <template #header>
                <i class="pi pi-dollar mr-2" />
                <span>{{ t("cryptoList.price") }}</span>
              </template>
              <div class="flex flex-wrap justify-around">
                <InputNumber
                  v-model="filters.minPrice"
                  class="my-2 lg:my-auto"
                  placeholder="min"
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                />
                <InputNumber
                  v-model="filters.maxPrice"
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
                <span>{{ t("cryptoList.marketCap") }}</span>
              </template>
              <div class="flex flex-wrap justify-around">
                <InputNumber
                  v-model="filters.minCap"
                  class="my-2 lg:my-auto"
                  placeholder="min"
                  :min="1"
                />
                <InputNumber
                  v-model="filters.maxCap"
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
