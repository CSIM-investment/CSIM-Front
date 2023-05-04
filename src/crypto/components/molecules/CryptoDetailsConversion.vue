<script setup lang='ts'>
import type { CryptoCurrencyMarket } from '~/common/generated/graphql'

const { t } = useI18n()

const props = defineProps<{
  crypto: CryptoCurrencyMarket
}>()

const cryptoAmount = ref(1)
const currencyAmount = ref(props.crypto.current_price)
const exchangeRate = cryptoAmount.value * currencyAmount.value

watch(cryptoAmount, (value) => {
  currencyAmount.value = value * exchangeRate
})

watch(currencyAmount, (value) => {
  cryptoAmount.value = value / exchangeRate
})

</script>

<template>
  <section class="CryptoDetailsConversion shadow rounded-md p-2 md:p-4 flex flex-col gap-2 md:gap-4">
    <h2 class="font-bold">
      {{ t('crypto.details.conversion.title') }}
    </h2>
    <div class="flex md:flex-col justify-center items-center gap-4 md:m-8">
      <CryptoDetailsConversionInput
        v-model="cryptoAmount"
        :symbol="crypto.symbol"
        :crypto-image="crypto.image"
      />
      <img src="/src/common/assets/images/exchange.svg" class="w-8 h-8 md:rotate-90" alt="">
      <CryptoDetailsConversionInput v-model="currencyAmount" symbol="USD" />
    </div>
  </section>
</template>

<style scoped lang='scss'>
.CryptoDetailsConversion {
  grid-area: conversion;
}
</style>
