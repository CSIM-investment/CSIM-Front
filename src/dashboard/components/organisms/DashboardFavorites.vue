<script lang="ts" setup>
import { useSessionStore } from '~/authentication/stores/session'
const { user } = useSessionStore()
const { t } = useI18n()
function AmountColor(data: number) {
  if (data >= 0)
    return 'card-solde__content__stat'
  else
    return 'card-solde__content__stat__danger'
}
</script>

<template>
  <div class="mt-5 text-xl font-bold font-medium">
    {{ t("dashboard.titleFavorits") }}
  </div>
  <p class="text-grey-dark mb-5 text-md font-medium">
    {{ t("dashboard.subtitleFavorits") }}
  </p>
  <div v-if="user?.favoritesCrypto && user?.favoritesCrypto?.length > 0" class=" md:flex flex-wrap">
    <div
      v-for="favorites in user?.favoritesCrypto"
      :key="favorites.id" class="py-3 px-2 ml-8 hover:bg-primary hover:cursor-pointer rounded-xl my-1 flex-wrap justify-evently bg-gradient-to-r from-secondary-light to-pink flex-col md:w-1/4 xl:w-1/6"
      @click="() => $router.push(`/cryptos/${favorites.symbol}`)"
    >
      <div class="flex">
        <img class="max-h-8 mr-5" :src="favorites.image" :alt="favorites.name">
        <span class="font-medium name-favorites xl:text-base md:text-sm sm:text-sm text-white">{{ favorites.name }}</span>
      </div>
      <div class="flex justify-center">
        <div class="flex flex-col justify-center">
          <span class="text-xs font-bold text-white"> $ {{ favorites.current_price.toFixed(2) }} </span>
          <div :class="AmountColor(favorites.price_change_percentage_24h)" class="w-fit bg-green px-1">
            <i class="pi pi-check !text-xs" />
            <span class="text-xs card-solde__content__stat__danger">{{ favorites.price_change_percentage_24h.toFixed(2) }} %</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Button class="p-button button" icon="pi pi-plus-circle" @click="$router.push('/market')" :label="t('dashboard.favoritsAdd')" />
  </div>
</template>
