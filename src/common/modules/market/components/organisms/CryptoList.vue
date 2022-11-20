<script lang="ts" setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
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
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      :global-filter-fields="['name', 'symbol']"
      responsive-layout="scroll"
    >
      <template #header>
        <div>
          <span>
            <i class="pi pi-search mr-4" />
            <InputText v-model="filters['global'].value" placeholder="Rechercher" />
          </span>
        </div>
      </template>
      <Column header-style="width: 3rem">
        <template #body>
          <div class="cursor-pointer">
            <i class="pi pi-star" />
          </div>
        </template>
      </Column>
      <Column header-style="width: 7rem">
        <template #body="{data}">
          <img class="max-h-10 mx-auto" :src="data.image" :alt="data.name">
        </template>
      </Column>
      <Column field="name" header="Nom" />
      <Column field="symbol" header="Symbole" />
      <Column field="price" header="Prix">
        <template #body="{data}">
          {{ format.dollarPrice(data.price) }}
        </template>
      </Column>
      <Column field="marketCap" header="Market Cap">
        <template #body="{data}">
          {{ '#' + data.marketCap }}
        </template>
      </Column>
      <Column field="changes" header="Changement 24h">
        <template #body="{data}">
          <div :class="data.changes >= 0 ? 'text-green' : 'text-red'">
            {{ data.changes + '%' }}
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
