<script setup lang="ts">
import { useAccountInvestmentsQuery } from '~/common/generated/graphql'

const { t } = useI18n()

const { result: investmentsList, refetch: refetchInvestements } = useAccountInvestmentsQuery()

const templateLink = ref<HTMLAnchorElement>()

function onClickTemplateDownload() {
  templateLink.value?.click()
}
</script>

<template>
  <div class="min-h-full flex flex-col gap-4">
    <h1 class="text-3xl font-bold">
      {{ t('investments.investments.title') }}
    </h1>
    <h2 class="text-md text-grey-dark">
      {{ t('investments.investments.subtitle') }}
    </h2>
    <InvestmentFilesDrop
      @template-download="onClickTemplateDownload"
      @files-imported="refetchInvestements"
    />
    <InvestmentList :list="investmentsList?.account?.investments ?? []" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
