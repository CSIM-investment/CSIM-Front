<script setup lang='ts'>

const cryptoAmount = ref(0)
const currencyAmount = ref(0)
const exchangeRate = ref(0.5)

watch(cryptoAmount, (value) => {
  currencyAmount.value = value * exchangeRate.value
})

watch(currencyAmount, (value) => {
  cryptoAmount.value = value / exchangeRate.value
})

</script>

<template>
  <section class="CryptoDetailsConversion shadow rounded-md p-2 md:p-4 flex flex-col gap-2 md:gap-4">
    <h2 class="font-bold">
      Conversion
    </h2>
    <div class="flex md:flex-col justify-center items-center gap-4 md:m-8">
      <CryptoDetailsConversionInput
        v-model="cryptoAmount"
        symbol="BTC"
        crypto-image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/64px-Bitcoin.svg.png"
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
