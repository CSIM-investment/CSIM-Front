<script setup lang='ts'>
import type { Crypto } from '~/interfaces/crypto.interface'

const props = defineProps<{
  crypto: Crypto
}>()

const favoriteIcon = computed(() => {
  return true ? 'pi pi-star-fill' : 'pi pi-star'
})
</script>

<template>
  <section class="CryptoDetailsHeader">
    <div class="flex  w-full gap-1 md:gap-4 md:w-auto">
      <img :src="props.crypto.image" alt="" class="w-12 h-12">
      <div>
        <h1 class="font-bold">
          {{ props.crypto.name }}
        </h1>
        <div class="font-bold text-xl">
          $ 7,000 <span class="text-error text-xs">-0.73%</span>
        </div>
      </div>
      <div class="flex gap-1 ml-auto md:hidden">
        <Button :icon="favoriteIcon" class="p-button-rounded p-button-sm " />
        <Button icon="pi pi-shopping-cart" class="p-button-rounded p-button-sm " />
        <Button icon="pi pi-dollar" class="p-button-rounded p-button-sm " />
      </div>
      <div />
    </div>

    <div class="gap-2 md:gap-12 hidden xs:flex">
      <CryptoDetailsStat label="Market Cap" stat="$ 1,000,000,000" />
      <CryptoDetailsStat label="24h Volume" stat="$ 1,000,000,000" />
      <CryptoDetailsStat label="circulation supply" stat="19,225,255.00 BTC" />
    </div>

    <div class="gap-8 hidden md:flex">
      <Button class="p-button p-button-secondary">
        Vendre
      </Button>
      <Button>
        Acheter
      </Button>
    </div>
  </section>
</template>
<style scoped lang='scss'>
.CryptoDetailsHeader {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  grid-area: header;

  &__actions {
    display: flex;
    gap: 1rem;
  }
}
</style>
