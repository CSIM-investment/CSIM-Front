<script setup lang="ts">
const { t } = useI18n()
const templateLink = ref<HTMLAnchorElement>()
function onClickTemplateDownload() {
  console.log('templateLink.value', templateLink.value)
  templateLink.value?.click()
}
</script>

<template>
  <div class="min-h-full flex flex-col gap-4">
    <h1 class="text-3xl font-bold">
      {{ t('investment.title') }}
    </h1>
    <h2 class="text-md text-grey-dark">
      {{ t('investment.subtitle') }}
    </h2>
    <InvestmentFilesDrop @template-download="onClickTemplateDownload" />
    <a ref="templateLink" href="investment-template.csv" download />
    <InvestmentList />
  </div>
</template>

<style scoped>

</style>
<route lang="yaml">
meta:
  layout: admin
</route>
