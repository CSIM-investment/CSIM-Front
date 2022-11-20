<script lang="ts" setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import Sidebar from 'primevue/sidebar'
import Button from 'primevue/button'
import { ref } from 'vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import { useCryptoStore } from '~/stores/crypto'
import { format } from '~/support/format'

const cryptoStore = useCryptoStore()
cryptoStore.setCryptos()
const cryptos = cryptoStore.getCryptos

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  symbol: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
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
</script>

<template>
  <div>
    <DataTable
      v-model:filters="filters"
      :value="cryptos"
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
    <Sidebar v-model:visible="visibleRight" class="z-10" position="right">
      <div>
        <h2 class="font-bold text-2xl">
          Filtres
        </h2>
      </div>
    </Sidebar>
  </div>
</template>

<style scoped lang='scss'>
  ::v-deep(.p-paginator) {
    justify-content: end;
  }
</style>
