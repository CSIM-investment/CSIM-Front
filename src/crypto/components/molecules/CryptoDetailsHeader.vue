<script setup lang='ts'>
import type { CryptoCurrencyMarket } from '~/common/generated/graphql'

const { t } = useI18n()

const props = defineProps<{
  crypto: CryptoCurrencyMarket
}>()

const favoriteIcon = computed(() => {
  return true ? 'pi pi-star-fill' : 'pi pi-star'
})

const marketCapClass = computed(() => {
  return props.crypto.market_cap_change_percentage_24h > 0
    ? 'text-success'
    : 'text-error'
})
</script>

<template>
  <section class="CryptoDetailsHeader">
    <div class="flex w-full gap-1 lg:gap-4 lg:w-auto">
      <img :src="props.crypto.image" alt="" class="w-12 h-12">
      <div>
        <h1 class="font-bold">
          {{ props.crypto.name }}
        </h1>
        <div class="font-bold text-xl">
          ${{ props.crypto.current_price }}
          <span class="text-xs" :class="marketCapClass">{{ props.crypto.market_cap_change_percentage_24h }}%</span>
        </div>
      </div>
      <div class="flex gap-1 ml-auto lg:hidden">
        <Button :icon="favoriteIcon" class="button button-icon-only button-small" />
        <Button icon="pi pi-shopping-cart" class="button button-icon-only button-small" />
        <Button icon="pi pi-dollar" class="button button-icon-only button-small" />
      </div>
      <div />
    </div>

    <div class="flex gap-2 md:gap-8 lg:gap-12">
      <CryptoDetailsStat :label="t('crypto.market_cap')" :stat="`$${crypto.market_cap}`" />
      <CryptoDetailsStat :label="t('crypto.high_24h')" :stat="`$${crypto.high_24h}`" />
      <CryptoDetailsStat :label="t('crypto.circulating_supply')" :stat="`${crypto.circulating_supply} ${crypto.symbol.toUpperCase()}`" />
    </div>

    <div class="gap-8 hidden lg:flex">
      <Button class="button button-small" :label="t('crypto.sell')" />
      <Button class="button button-secondary button-small" :label="t('crypto.buy')" />
    </div>
  </section>
</template>
<style scoped lang='scss'>
.CryptoDetailsHeader {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  grid-area: header;
  gap: 1rem;

  &__actions {
    display: flex;
    gap: 1rem;
  }
}
</style>
