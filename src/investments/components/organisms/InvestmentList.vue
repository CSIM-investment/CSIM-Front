<script setup lang="ts">
import moment from 'moment-with-locales-es6'
import type { InvestmentEntity } from '~/common/generated/graphql'

const { t } = useI18n()

const props = defineProps<{
  list: InvestmentEntity[]
}>()

</script>

<template>
  <div class="text-2xl font-bold flex gap-8 border-b-2 w-fit border-grey">
    <span>{{ t('investments.investments.list.title1') }}</span>
    <span>{{ t('investments.investments.list.title2') }}</span>
  </div>
  <DataTable :value="list" responsive-layout="scroll" sort-field="creationDate" sort-order="-1">
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
        {{ moment(slotProps.data.creationDate).format('LL') }}
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
