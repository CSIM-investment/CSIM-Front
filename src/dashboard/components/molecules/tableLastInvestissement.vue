<script setup lang="ts">
import moment from 'moment-with-locales-es6'
import { useSessionStore } from '~/authentication/stores/session'
const { user } = useSessionStore()
const { t } = useI18n()

</script>

<template>
  <div class="mt-5 text-xl font-bold text-secondary-lighter">
    {{ t("dashboard.titleLastInvests") }}
  </div>
  <p class="text-grey-dark mb-5 text-md font-medium">
    {{ t("dashboard.subtitleLastInvests") }}
  </p>
  <DataTable :value="user?.sold?.lastInvestments" responsive-layout="scroll" sort-field="creationDate" sort-order="-1">
    <Column field="type" sortable :header="t('investments.investments.list.type')">
      <template #body="slotProps">
        {{ slotProps.data.type === "in"
          ? t('investments.investments.list.purchase')
          : t('investments.investments.list.sale')
        }}
      </template>
    </Column>
    <Column field="creationDate" :sortable="true" :header="t('investments.investments.list.transactionDate')">
      <template #body="slotProps">
        {{ moment(slotProps.data.dateOfInvestment).format('LL') }}
      </template>
    </Column>
    <Column field="valueBaseCurrency" :header="t('investments.investments.list.from')">
      <template #body="slotProps">
        {{ slotProps.data.valueBaseCurrency.toFixed(5) }} {{ slotProps.data.baseCurrency.symbol }}
      </template>
    </Column>
    <Column field="valueQuoteCurrency" :header="t('investments.investments.list.to')">
      <template #body="slotProps">
        {{ slotProps.data.valueQuoteCurrency.toFixed(5) }} {{ slotProps.data.quoteCurrency.symbol }}
      </template>
    </Column>
  </DataTable>
</template>
