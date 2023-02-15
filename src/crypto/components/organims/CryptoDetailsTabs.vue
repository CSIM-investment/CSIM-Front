<script setup lang='ts'>
import type { CryptoCurrencyMarket } from '~/common/generated/graphql'

const { t } = useI18n()

const props = defineProps<{
  crypto: CryptoCurrencyMarket
}>()

</script>

<template>
  <section class="CryptoDetailsTabs rounded  h-100vh md:h-full">
    <TabView class="h-full">
      <TabPanel :header="t('crypto.details.graphs.title')">
        <CryptoDetailsGraph :crypto="crypto" />
      </TabPanel>
      <TabPanel :header="t('crypto.details.info.title')">
        <CryptoDetailsInformation :crypto="crypto" />
      </TabPanel>
      <TabPanel :header="t('crypto.details.news.title')">
        <CryptoDetailsNews />
      </TabPanel>
    </TabView>
  </section>
</template>

<style scoped lang="scss">
.CryptoDetailsTabs {
  grid-area: tabs;

  :deep(.p-tabview-panels), :deep(.p-tabview-panel) {
    height: 100%;
  }

  :deep(.p-tabview-panels) {
    border-left: 1px solid #dee2e6 ;
  }
}
</style>
