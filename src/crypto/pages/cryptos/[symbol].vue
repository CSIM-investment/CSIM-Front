<script setup lang='ts'>
import type { Crypto } from '~/interfaces/crypto.interface'
import { useCryptoStore } from '~/stores/crypto'

const { symbol } = useRoute().params as Record<'symbol', string>
const { $state } = useCryptoStore()
const crypto: Crypto = {
  id: 1,
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/64px-Bitcoin.svg.png',
  name: 'Bitcoin',
  symbol: 'BTC',
  price: 20456,
  marketCap: 1,
  changes: -0.74,
}

function onFavoriteClick() {
  console.log('onFavoriteClick')
}
</script>

<template>
  <div class="CryptoDetailsPage">
    <div v-if="crypto" class="CryptoDetailsPage__content">
      <CryptoDetailsHeader :crypto="crypto" />
      <div
        class="cursor-pointer shadow rounded-md flex justify-center items-center gap-2 text-xl hidden md:flex"
        @click="onFavoriteClick"
      >
        <i class="pi pi-star-fill !text-xl" />Favoris
      </div>
      <CryptoDetailsConversion />
      <CryptoDetailsTabs :crypto="crypto" />
    </div>

    <div v-else class="CryptoDetailsPage--empty">
      <p>not crypto found</p>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.CryptoDetailsPage {
  display: flex;
  background: #F4F7F9;
  min-height: 100%;
  min-width: 100%;
  padding: 0;

  @screen xs {
    padding: 1rem;
  }

  @screen md {
    padding: 2rem;
  }

  &__content {
    display: grid;
    background: white;
    min-height: 100%;
    min-width: 100%;
    align-items: stretch;

    padding: 1rem;
    grid-template-columns: 1fr;
    grid-template-rows: 100px 100px 1fr;
    grid-template-areas:
            "header"
            "conversion"
            "tabs";
    grid-gap: 16px;

    @screen md {
      padding: 4rem;
      grid-template-columns: 360px 1fr 1fr 1fr;
      grid-template-rows: 60px 60px 1fr 1fr;
      grid-template-areas:
            "header     header header header"
            "favorite   tabs   tabs   tabs"
            "conversion tabs   tabs   tabs"
            "conversion tabs   tabs   tabs";
      grid-gap: 42px;
    }

  }

  &__favorite {
    grid-area: favorite;
  }

  &--empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
</style>
