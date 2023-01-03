<script setup lang="ts">
import { useGetCryptoQuery } from '~/common/generated/graphql'

const { t } = useI18n()
const { symbol } = useRoute().params as Record<'symbol', string>

const { result, error, loading } = useGetCryptoQuery({ symbol })

const crypto = computed(() => result?.value?.cryptos[0])

function onFavoriteClick() {
  // console.log('onFavoriteClick')
}

</script>

<template>
  <div class="CryptoDetailsPage">
    <div v-if="loading">
      ..loading
    </div>

    <Error500 v-else-if="error" />

    <div v-else-if="crypto" class="CryptoDetailsPage__content">
      <CryptoDetailsHeader :crypto="crypto" />
      <div
        class="cursor-pointer shadow rounded-md flex justify-center items-center gap-2 text-xl hidden md:flex"
        @click="onFavoriteClick"
      >
        <i class="pi pi-star-fill !text-xl" />{{ t('crypto.follow') }}
      </div>
      <CryptoDetailsConversion :crypto="crypto" />
      <CryptoDetailsTabs :crypto="crypto" />
    </div>

    <Error404 v-else />
  </div>
</template>

<style scoped lang="scss">
.CryptoDetailsPage {
  display: flex;
  background: #F4F7F9;
  padding: 0;

  @screen xs {
    padding: 1rem;
  }

  @screen md {
    max-height: calc(100vh - 64px);
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
    grid-template-rows: 100px 100px 100vh;
    grid-template-areas:
            "header"
            "conversion"
            "tabs";
    grid-gap: 1rem;

    @screen md {
      padding: 4rem;
      grid-template-columns: minmax(150px, 360px) 1fr 1fr minmax(40%, 1fr);
      grid-template-rows: minmax(60px, auto) 60px 1fr 1fr;
      grid-template-areas:
            "header     header header header"
            "favorite   tabs   tabs   tabs"
            "conversion tabs   tabs   tabs"
            "conversion tabs   tabs   tabs";
      grid-gap: 3rem;
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
