<template>
  <div>
    <div class="grid grid-cols-4">
      <div class="dashboard bg-grey-lighter col-span-3 flex flex-col">
        <div class="dashboard__container h-full mx-8 my-8 flex flex-col">
          <h1 class="text-3xl font-bold font-medium">Dashboard</h1>
          <p class="text-grey-dark mt-2 text-md font-medium">Un aperçu de votre compte cryptomonnaie</p>
          <div class="grid grid-cols-3 gap-8 mx-8">
            <cardSolde></cardSolde>
            <div class="bg-white col-span-2 px-8 py-5 text-white flex">
              <doughnuts class="max-h-32 w-1/3"></doughnuts>
              <div class="flex w-2/3 justify-evenly flex-col">
                <div class="flex justify-evenly items-center">
                  <div class="flex items-center">
                    <span class="w-3 h-3 rounded-xl bg-primary"></span>
                    <p class="text-grey-dark ml-2 text-md font-medium">Bitcoin</p>
                  </div>
                  <div class="flex items-center">
                    <span class="w-3 h-3 rounded-xl bg-primary"></span>
                    <p class="text-grey-dark ml-2 text-md font-medium">Bitcoin</p>
                  </div>
                </div>
                <div class="flex justify-evenly items-center">
                  <div class="flex items-center">
                    <span class="w-3 h-3 rounded-xl bg-primary"></span>
                    <p class="text-grey-dark ml-2 text-md font-medium">Bitcoin</p>
                  </div>
                  <div class="flex items-center">
                    <span class="w-3 h-3 rounded-xl bg-primary"></span>
                    <p class="text-grey-dark ml-2 text-md font-medium">Bitcoin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="grow">
            <CryptoDetailsGraph v-if="crypto" :crypto="crypto"></CryptoDetailsGraph>
          </div>
        </div>
      </div>
      <div class="sidebar flex flex-col w-full">
        <div class="h-1/2 mt-5">
          <div class="flex flex-col w-full">
            <div class="mx-5 flex justify-between">
              <h2 class="font-bold"> Favoris</h2>
              <RouterLink to="" class="voir_plus"> Voir plus</RouterLink>
            </div>
            <div class=" mt-5 flex flex-col justify-evently mx-5">
              <div v-for="favorites in user.favoritesCrypto" :key="favorites.id"
                   class="py-3 px-5 my-2 rounded-xl justify-evently bg-gradient-to-r from-secondary-light to-pink flex w-full">
                <div class="w-3/4 flex">
                  <img class="max-h-10 mr-5" :src="favorites.image" :alt="favorites.name">
                  <span class="font-medium text-xl text-white">{{favorites.name}}</span>
                </div>
                <div class="w-1/4">
                  <div class="flex flex-col justify-end">
                    <span class="text-xs font-bold text-white"> $ {{favorites.current_price}} </span>
                    <div class="card-solde__content__stat bg-green px-1">
                      <i class="pi pi-check card-solde__content__stat__icon !text-sm"></i>
                      <span class="card-solde__content__stat__percentage text-sm">+ 1,6%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex h-1/2">
          <div class="flex flex-col w-full">
            <div class="mx-2 flex justify-around align-items-center">
              <h2 class="font-bold mr-5"> Transactions récentes</h2>
              <RouterLink to="" class="voir_plus"> Voir plus</RouterLink>
            </div>
            <div class=" mt-5 flex flex-col justify-evently">
              <div v-for="n in 4" class="mx-2 my-2 justify-evently flex w-full">
                <div class="w-3/4 flex">
                  <i class="pi pi-wallet pr-5 !text-2xl"/>
                  <span class="font-medium text-xl"> Bitcoin </span>
                </div>
                <div class="w-1/4">
                  <div class="flex flex-col justify-end">
                    <span class="text-md font-bold text-secondary-lighter"> 30 € </span>
                    <p class="text-grey-darker text-xs"> 15 fev 2023 </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useGetCryptoQuery} from '~/common/generated/graphql'

const {t} = useI18n()
const {symbol} = useRoute().params as Record<'symbol', string>
import {useSessionStore} from '~/authentication/stores/session'

const {user} = useSessionStore()
const {result, error, loading} = useGetCryptoQuery({'symbol': 'btc'})

const crypto = computed(() => result?.value?.cryptos.datas[0])

</script>
<style lang="scss">
.dashboard {
  height: 90vh;
}

.sidebar {
  background-color: white;
}
</style>