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
import { computed, ref } from 'vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import { useCryptoStore } from '~/stores/crypto'
import { format } from '~/support/format'

const cryptoStore = useCryptoStore()
cryptoStore.setCryptos()
const cryptos = cryptoStore.getCryptos

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const columns = ref<any>([
  { field: 'icon', header: 'Icône' },
  { field: 'name', header: 'Nom' },
  { field: 'symbol', header: 'Symbole' },
  { field: 'price', header: 'Prix' },
  { field: 'marketCap', header: 'Market Cap' },
  { field: 'changes', header: 'Changement 24h' },
])

const selectedColumns = ref<any>(columns.value)
const onToggle = (val: any) => {
  selectedColumns.value = columns.value.filter((col: any) => val.includes(col))
}

const columnIsSelected = (col: string): boolean => {
  return selectedColumns.value.some((column: { field: string }) => column.field === col)
}

const visibleRight = ref<boolean>(false)

const minPrice = ref<any>(null)
const maxPrice = ref<any>(null)

const cryptosFiltered = computed(() => {
  let _cryptos = cryptos
  if (minPrice.value)
    _cryptos = _cryptos.filter(crypto => crypto.price > minPrice.value)
  if (maxPrice.value)
    _cryptos = _cryptos.filter(crypto => crypto.price < maxPrice.value)

  return _cryptos
})

const resetPriceFilter = () => {
  minPrice.value = null
  maxPrice.value = null
}

const resetFilters = () => {
  resetPriceFilter()
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
              <InputText v-model="filters['global'].value" placeholder="Rechercher" />
            </span>
          </div>
          <div class="m-2">
            <Button label="Filtres" class="p-button-outlined" icon="pi pi-filter" @click="visibleRight = true" />
          </div>
          <div class="m-2">
            <MultiSelect
              class="w-64"
              :model-value="selectedColumns"
              :options="columns"
              option-label="header"
              placeholder="Colonnes"
              @update:model-value="onToggle"
            />
          </div>
        </div>
      </template>
      <Column header-style="width: 3rem">
        <template #body>
          <div class="cursor-pointer">
            <i class="pi pi-star" />
          </div>
        </template>
      </Column>
      <Column v-if="columnIsSelected('icon')" header-style="width: 7rem">
        <template #body="{data}">
          <img class="max-h-10 mx-auto" :src="data.image" :alt="data.name">
        </template>
      </Column>
      <Column v-if="columnIsSelected('name')" field="name" header="Nom" />
      <Column v-if="columnIsSelected('symbol')" field="symbol" header="Symbole" />
      <Column v-if="columnIsSelected('price')" field="price" sortable header="Prix">
        <template #body="{data}">
          {{ format.dollarPrice(data.price) }}
        </template>
      </Column>
      <Column v-if="columnIsSelected('marketCap')" field="marketCap" sortable header="Market Cap">
        <template #body="{data}">
          {{ format.cap(data.marketCap) }}
        </template>
      </Column>
      <Column v-if="columnIsSelected('changes')" field="changes" sortable header="Changement 24h">
        <template #body="{data}">
          <div :class="data.changes >= 0 ? 'text-green' : 'text-red'">
            {{ format.percentage(data.changes) }}
          </div>
        </template>
      </Column>
    </DataTable>
    <Sidebar v-model:visible="visibleRight" class="p-sidebar-md h-100" position="right">
      <div>
        <h2 class="font-bold text-2xl">
          Filtres
        </h2>
        <div class="my-4">
          <Accordion class="accordion-custom">
            <AccordionTab>
              <template #header>
                <i class="pi pi-dollar mr-2" />
                <span>Prix</span>
              </template>
              <div class="flex flex-wrap justify-around">
                <InputNumber v-model="minPrice" placeholder="min" mode="currency" currency="USD" locale="en-US" />
                <InputNumber v-model="maxPrice" placeholder="max" mode="currency" currency="USD" locale="en-US" />
                <Button icon="pi pi-refresh" class="p-button-rounded p-button-text p-button-plain" @click="resetPriceFilter" />
              </div>
            </AccordionTab>
            <AccordionTab>
              <template #header>
                <i class="pi pi-dollar mr-2" />
                <span>Changement (24h)</span>
              </template>
              <div />
            </AccordionTab>
            <AccordionTab>
              <template #header>
                <i class="pi pi-dollar mr-2" />
                <span>Market Cap</span>
              </template>
              <div />
            </AccordionTab>
          </Accordion>
        </div>
      </div>
      <div class="flex flex-wrap justify-end">
        <Button
          label="Annuler les filtres" background class="p-button-outlined"
          icon="pi pi-refresh" icon-pos="left" @click="resetFilters()"
        />
      </div>
    </Sidebar>
  </div>
</template>

<style scoped lang='scss'>
  ::v-deep(.p-paginator) {
    justify-content: end;
  }
</style>
