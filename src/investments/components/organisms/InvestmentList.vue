<script setup lang="ts">
const { t } = useI18n()

const data = [
  { type: 'Achat', transactionAt: '2021-01-01', from: '1 EUR', to: '0.453 BTC', fees: '0.01' },
  { type: 'Vente', transactionAt: '2021-01-01', from: '1 EUR', to: '0.453 BTC', fees: '0.01' },
  { type: 'Achat', transactionAt: '2021-01-01', from: '1 EUR', to: '0.453 BTC', fees: '0.01' },
  { type: 'Vente', transactionAt: '2021-01-01', from: '1 EUR', to: '0.453 BTC', fees: '0.01' },
  { type: 'Achat', transactionAt: '2021-01-01', from: '1 EUR', to: '0.453 BTC', fees: '0.01' },
  { type: 'Vente', transactionAt: '2021-01-01', from: '1 EUR', to: '0.453 BTC', fees: '0.01' },
  { type: 'Achat', transactionAt: '2021-01-01', from: '1 EUR', to: '0.453 BTC', fees: '0.01' },
  { type: 'Vente', transactionAt: '2021-01-01', from: '1 EUR', to: '0.453 BTC', fees: '0.01' },
  { type: 'Achat', transactionAt: '2021-01-01', from: '1 EUR', to: '0.453 BTC', fees: '0.01' },
  { type: 'Vente', transactionAt: '2021-01-01', from: '1 EUR', to: '0.453 BTC', fees: '0.01' },
  { type: 'Achat', transactionAt: '2021-01-01', from: '1 EUR', to: '0.453 BTC', fees: '0.01' },
  { type: 'Vente', transactionAt: '2021-01-01', from: '1 EUR', to: '0.453 BTC', fees: '0.01' },
  { type: 'Achat', transactionAt: '2021-01-01', from: '1 EUR', to: '0.453 BTC', fees: '0.01' },
]
</script>

<template>
  <div class="text-2xl font-bold flex gap-8 border-b-2 w-fit border-grey">
    <span>{{ t('investments.investments.list.title1') }}</span>
    <span>{{ t('investments.investments.list.title2') }}</span>
  </div>
  <DataTable :value="data" responsive-layout="scroll">
    <Column field="type" :header="t('investments.investments.list.type')" />
    <Column field="transactionAt" :header="t('investments.investments.list.transactionDate')" />
    <Column field="from" :header="t('investments.investments.list.from')" />
    <Column field="to" :header="t('investments.investments.list.to')" />
    <Column field="fees" :header="t('investments.investments.list.fees')" />
  </DataTable>
</template>
