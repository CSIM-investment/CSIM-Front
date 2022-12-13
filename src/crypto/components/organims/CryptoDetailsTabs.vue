<script setup lang='ts'>
import type { Crypto } from '~/interfaces/crypto.interface'

const props = defineProps<{
  crypto: Crypto
}>()

</script>

<template>
  <section class="CryptoDetailsTabs border-l border-grey max-h-20">
    <TabView>
      <TabPanel header="Graphe">
        <CryptoDetailsGraph />
      </TabPanel>
      <TabPanel header="Informations">
        <CryptoDetailsInformation :crypto="crypto" />
      </TabPanel>
      <TabPanel header="Actualité">
        <CryptoDetailsNews />
      </TabPanel>
    </TabView>
  </section>
</template>

<style scoped lang='scss'>
.CryptoDetailsTabs {
  grid-area: tabs;
}
</style>
