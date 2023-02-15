<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useGetCryptoQuery, useToggleFavoriteCryptoMutation } from '~/common/generated/graphql'
import { useSessionStore } from '~/authentication/stores/session'
const toast = useToast()
const { user, fetchSession } = useSessionStore()

const { t } = useI18n()
const { symbol } = useRoute().params as Record<'symbol', string>

const { result, error, loading } = useGetCryptoQuery({ symbol })

const crypto = computed(() => result?.value?.cryptos.datas[0])

const isFavorite = computed(() => {
  if (user.value && user.value?.favoritesCrypto)
    return user.value?.favoritesCrypto.filter(item => item.id === crypto.value?.id).length > 0
  return false
})

const { mutate: toggleFavorite } = useToggleFavoriteCryptoMutation({})

const toggleFavoriteCrypto = async(hadToFavorite: boolean) => {
  if (hadToFavorite)
    toast.add({ detail: t('cryptoList.addFavorite', { cryptoName: crypto.value?.name }), severity: 'success', life: 3000 })
  else
    toast.add({ detail: t('cryptoList.removeFavorite', { cryptoName: crypto.value?.name }), severity: 'success', life: 3000 })

  try {
    await toggleFavorite({ input: { cryptoId: crypto.value?.id ?? '', hadToFavorite } })
    await fetchSession()
  }
  catch (e) {
    console.error(e)
  }
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
        v-if="user"
        class="cursor-pointer shadow rounded-md flex justify-center items-center gap-2 text-xl hidden lg:flex"
        @click="toggleFavoriteCrypto(!isFavorite)"
      >
        <i class="pi !text-xl" :class="isFavorite ? 'pi-star-fill' : 'pi-star'" />{{ t('crypto.follow') }}
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
  margin-top: 70px;

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
