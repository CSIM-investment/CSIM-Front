<script lang="ts" setup>
import { useGetCryptoQuery } from '~/common/generated/graphql'
import { useSessionStore } from '~/authentication/stores/session'

const { t } = useI18n()
const { symbol } = useRoute().params as Record<'symbol', string>

const { user } = useSessionStore()
const { result } = useGetCryptoQuery({ symbol: 'btc' })

const crypto = computed(() => result?.value?.cryptos.datas[0])

</script>

<template>
  <div>
    <div class="grid lg:grid-cols-4">
      <div class="dashboard bg-grey-lighter col-span-3 flex flex-col">
        <div class="dashboard__container h-full mx-8 my-8 flex flex-col">
          <h1 class="text-3xl font-bold font-medium">
            Dashboard
          </h1>
          <p class="text-grey-dark mt-2 text-md font-medium">
            Un aperçu de votre compte cryptomonnaie
          </p>
          <div class="md:grid md:grid-cols-5 xl:gap-8 mx-8">
            <cardSolde />
            <div class="md:col-span-3 lg:hidden px-8 py-5 text-white flex" />
            <div class="bg-white col-span-5 lg:col-span-3 px-8 py-5 text-white flex">
              <doughnuts class="max-h-32 w-1/3" />
              <div class="flex w-2/3 justify-evenly flex-col">
                <div class="flex justify-evenly items-center">
                  <div class="flex items-center">
                    <span class="w-3 h-3 rounded-xl bg-primary" />
                    <p class="text-grey-dark ml-2 text-md font-medium">
                      Bitcoin
                    </p>
                  </div>
                  <div class="flex items-center">
                    <span class="w-3 h-3 rounded-xl bg-primary" />
                    <p class="text-grey-dark ml-2 text-md font-medium">
                      Bitcoin
                    </p>
                  </div>
                </div>
                <div class="flex justify-evenly items-center">
                  <div class="flex items-center">
                    <span class="w-3 h-3 rounded-xl bg-primary" />
                    <p class="text-grey-dark ml-2 text-md font-medium">
                      Bitcoin
                    </p>
                  </div>
                  <div class="flex items-center">
                    <span class="w-3 h-3 rounded-xl bg-primary" />
                    <p class="text-grey-dark ml-2 text-md font-medium">
                      Bitcoin
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DataTable :value="user?.sold?.topInvestments" responsive-layout="scroll">
            <Column field="quoteCurrency.image" header="Crypto">
            <template #body="{ data }">
                <div class="flex">
                  <Image class="mr-2" :src="data.quoteCurrency.image" width="30" height="30" />
                </div>
              </template>
            </Column>
          <Column field="quoteCurrency.symbol" header="symbol" />
          <Column field="quantity" header="quantity" />
        </DataTable>
        </div>
      </div>
      <div class="sidebar lg:mt-0 mt-[10rem] flex xs:flex-col w-full">
        <div class="h-1/2 mt-5">
          <div class="flex flex-col w-full">
            <div class="mx-5 flex justify-between">
              <h2 class="font-bold">
                Favoris
              </h2>
            </div>
            <div class=" mt-5 flex flex-col justify-evently mx-5">
              <div
                v-for="favorites in user.favoritesCrypto" :key="favorites.id"
                class="py-3 w-full px-5 my-2 rounded-xl justify-evently bg-gradient-to-r from-secondary-light to-pink flex w-full"
              >
                <div class="w-3/4 flex">
                  <img class="max-h-10 mr-5" :src="favorites.image" :alt="favorites.name">
                  <span class="font-medium name-favorites xl:text-base md:text-base text-white">{{ favorites.name }}</span>
                </div>
                <div class="md:w-2/4 xl:w-1/4">
                  <div class="flex flex-col items-end	justify-end">
                    <span class="text-xs font-bold text-white"> $ {{ favorites.current_price }} </span>
                    <div class="card-solde__content__stat w-fit bg-green px-1">
                      <i class="pi pi-check card-solde__content__stat__icon !text-sm" />
                      <span class="card-solde__content__stat__percentage text-sm">+ 1,6%</span>
                    </div>
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
<style lang="scss">
.dashboard {
  height: 90vh;
}

.sidebar {
  background-color: white;
}
.name-favorites {
  overflow-wrap: anywhere;
}
</style>

<route lang="yaml">
meta:
  auth: true
</route>
