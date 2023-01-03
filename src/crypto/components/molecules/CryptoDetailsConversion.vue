<script setup lang='ts'>
import type { CryptoCurrencyMarket } from '~/common/generated/graphql'
import { CoinGecko } from '~/crypto/services/CoinGeckoApi'

const { t } = useI18n()

const props = defineProps<{
  crypto: CryptoCurrencyMarket
}>()

const cryptoAmount = ref(1)
const currencyAmount = ref(0)
const exchangeRate = ref(1)

const hasCryptoPriceFetchFailed = ref(false)

onMounted(async() => {
  const coinGeckoApi = new CoinGecko.Api()

  try {
    currencyAmount.value = await coinGeckoApi.getCryptoPrice(props.crypto.id, 'usd')
    exchangeRate.value = cryptoAmount.value * currencyAmount.value
  }
  catch (error) {
    hasCryptoPriceFetchFailed.value = true
  }
})

watch(cryptoAmount, (value) => {
  currencyAmount.value = value * exchangeRate.value
})

watch(currencyAmount, (value) => {
  cryptoAmount.value = value / exchangeRate.value
})

</script>

<template>
  <section  class="CryptoDetailsConversion shadow rounded-md p-2 md:p-4 flex flex-col gap-2 md:gap-4">
    <h2 class="font-bold">
      {{ t('crypto.details.conversion.title') }}
    </h2>
    <div v-if="!hasCryptoPriceFetchFailed" class="flex md:flex-col justify-center items-center gap-4 md:m-8">
      <CryptoDetailsConversionInput
        v-model="cryptoAmount"
        symbol="BTC"
        crypto-image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/64px-Bitcoin.svg.png"
      />
      <img src="/src/common/assets/images/exchange.svg" class="w-8 h-8 md:rotate-90" alt="">
      <CryptoDetailsConversionInput v-model="currencyAmount" symbol="USD" />
    </div>
    <Error500 v-else />
  </section>
</template>

<style scoped lang='scss'>
.CryptoDetailsConversion {
  grid-area: conversion;
}
</style>
