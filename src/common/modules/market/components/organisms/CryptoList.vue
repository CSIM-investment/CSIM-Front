<script lang="ts" setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useCryptoStore } from '~/stores/crypto'

const cryptoStore = useCryptoStore()
cryptoStore.setCryptos()
const cryptos = cryptoStore.getCryptos
</script>

<template>
  <div>
    <DataTable :value="cryptos">
      <Column field="name" header="Nom" />
      <Column field="symbol" header="symbol" />
    </DataTable>
  </div>
</template>
