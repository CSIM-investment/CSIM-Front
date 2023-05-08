<script setup lang='ts'>
import { useToast } from 'primevue/usetoast'
import type { CryptoCurrencyMarket } from '~/common/generated/graphql'
import { useToggleFavoriteCryptoMutation } from '~/common/generated/graphql'
import { useSessionStore } from '~/authentication/stores/session'
const toast = useToast()
const { user, fetchSession } = useSessionStore()

const { t } = useI18n()

const props = defineProps<{
  crypto: CryptoCurrencyMarket
}>()

const marketCapClass = computed(() => {
  return props.crypto.market_cap_change_percentage_24h > 0
    ? 'text-success'
    : 'text-error'
})

const isFavorite = computed(() => {
  if (user.value && user.value?.favoritesCrypto)
    return user.value?.favoritesCrypto.filter(item => item.id === props.crypto.id).length > 0
  return false
})

const { mutate: toggleFavorite } = useToggleFavoriteCryptoMutation({})

const toggleFavoriteCrypto = async(hadToFavorite: boolean) => {
  if (hadToFavorite)
    toast.add({ detail: t('cryptoList.addFavorite', { cryptoName: props.crypto.name }), severity: 'success', life: 3000 })
  else
    toast.add({ detail: t('cryptoList.removeFavorite', { cryptoName: props.crypto.name }), severity: 'success', life: 3000 })

  try {
    await toggleFavorite({ input: { cryptoId: props.crypto.id, hadToFavorite } })
    await fetchSession()
  }
  catch (e) {
    console.error(e)
  }
}
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
        <Button aria-label="Aria Name" v-if="user" :icon="isFavorite ? 'pi pi-star-fill' : 'pi pi-star'" class="button button-icon-only button-small" @click="toggleFavoriteCrypto(!isFavorite)" />
      </div>
      <div />
    </div>

    <div class="flex gap-2 md:gap-8 lg:gap-12">
      <CryptoDetailsStat :label="t('crypto.market_cap')" :stat="`$${crypto.market_cap}`" />
      <CryptoDetailsStat :label="t('crypto.high_24h')" :stat="`$${crypto.high_24h}`" />
      <CryptoDetailsStat :label="t('crypto.circulating_supply')" :stat="`${crypto.circulating_supply} ${crypto.symbol.toUpperCase()}`" />
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
