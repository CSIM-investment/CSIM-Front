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
    <DataTable
      :value="cryptos" :paginator="true" :rows="10"
      responsive-layout="scroll"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
    >
      <Column>
        <template #body="slotProps">
          <img class="max-h-10" :src="slotProps.data.image" alt="">
        </template>
      </Column>
      <Column field="name" header="Nom" />
      <Column field="symbol" header="Symbol" />
    </DataTable>
  </div>
</template>
