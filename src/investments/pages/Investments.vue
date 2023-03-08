<script setup lang="ts">
const { t } = useI18n()
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
    <InvestmentFilesDrop @template-download="onClickTemplateDownload" />
    <a ref="templateLink" href="investment-template.csv" download />
    <InvestmentList />
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
