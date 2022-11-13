<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div class="flex-col">
    <!-- Page d'acceuil -->
    <section class="flex-col background-landing-page pt-10">
      <div class="flex-col text-center pt-10">
        <h1 class="text-6xl font-black">
          Fastest and Easiest way to
        </h1>
        <h2 class="text-5xl font-black pt-5 sub-title text-color-grey">
          Buy, Sell & Trade
        </h2>
        <p class="pt-5">
          The place where you can trade cryptocurrencies with global market price
        </p>
        <Button class="button-landing-page w-1/6 mt-15 font-bold mb-4 mt-10" type="submit">
          Se connecter
        </Button>
      </div>
      <div class="mt-10 mb-10 flex justify-center">
        <div class="flex items-center pr-10">
          <img src="public/bitcoin.png" class="mr-3" width="40px" height="40px">
          <span> Bitcoin </span>
        </div>
        <div class="flex items-center pr-10">
          <img src="public/bitcoin.png" class="mr-3" width="40px" height="40px">
          <span> Bitcoin </span>
        </div>
        <div class="flex items-center">
          <img src="public/bitcoin.png" class="mr-3" width="40px" height="40px">
          <span> Bitcoin </span>
        </div>
      </div>
      <div class="bottom-0 w-full transition-all duration-300 ease-in-out delay-150 mt-10">
        <span />
        <div class="wave mt-10" />
      </div>
    </section>
    <Footer />
  </div>
</template>
<style lang="css">
.background-landing-page {
  background: linear-gradient(307.57deg, rgba(142, 110, 202, 0.29) 21.99%, rgba(255, 255, 255, 0) 75.6%);
}

.sub-title {
  color: #CA9A6E !important;
}

.wave {
  height: 198px;
  background: url('src/common/assets/images/waves.svg') repeat-x;
  animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  transform: translate3d(0, 0, 0);
}

@keyframes wave {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -1600px;
  }
}
</style>
