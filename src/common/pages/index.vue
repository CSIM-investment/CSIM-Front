<script setup lang="ts">
import { computed } from 'vue'
import { format } from '~/support/format'
import { useGetCryptosListQuery } from '~/common/generated/graphql'

const { t } = useI18n()
const router = useRouter()

const { result, error, loading } = useGetCryptosListQuery({
  options: {
    filterBy: {
      pagination: {
        start: 0,
        end: 3,
      },
    },
    orderBy: {
      direction: 'DESC',
      name: 'market_cap',
    },
  },
})

const bestCryptos = computed(() => {
  return result?.value?.cryptos.datas ?? []
})

function AmountColor(data: number, rotate = false) {
  if (data >= 0)
    return 'icon_list'
  else
    return `icon_list_minus${rotate ? ' rotate-180' : ''}`
}

const redirect = (event: any): void => {
  router.push(`cryptos/${event.data.symbol}`)
}
</script>
<template>
  <article>
    <div class="flex-col">
      <section class="flex-col background-landing-page pt-20">
        <img class="absolute top-52 md:left-10 xl:left-20" src="/src/common/assets/images/bitcoin.png" alt="bitcoin">
        <img class="absolute top-72 md:right-10 xl:right-48 hidden xl:block" src="/src/common/assets/images/ethereum.png" alt="ethereum">
        <div class="flex-col text-center pt-10">
          <h1 class=" text-2xl sm:text-5xl font-black">
            {{ t('index.title') }}
          </h1>
          <h2 class="text-xl sm:text-3xl font-black pt-10 sub-title text-color-grey">
            {{ t('index.subtitle') }}
          </h2>
          <p class="py-10 sm:text-xl">
            {{ t('index.slogan') }}
          </p>
          <button
            class="button mx-auto xl:w-1/6 xs:2/6 font-bold mb-4 mt-1 transition-all duration-200 ease-in-out"
            @click="router.push('/register')"
          >
            {{ t('index.button') }}
          </button>
        </div>
        <div class="mt-10 mb-10 flex justify-center flex-wrap">
          <div v-for="(crypto, index) in bestCryptos" :key="index" class="ml-4 flex items-center">
            <Image :src="crypto.image" :alt="crypto.name" class="mr-3" width="40" height="40" />
            <span> {{ crypto.name }} </span>
          </div>
        </div>
        <div class="bottom-0 w-full transition-all duration-300 ease-in-out delay-150">
          <span />
          <div class="wave smt-10" />
        </div>
      </section>
      <section class="background-connector-darker">
        <div class="flex-col list-crypto w-full lg:max-w-3xl mx-auto">
          <DataTable :value="bestCryptos" :row-style="'cursor: pointer'" :row-hover="true" @row-click="redirect">
            <Column field="nom" header="Nom" style="min-width: 14rem">
              <template #body="{ data }">
                <div class="flex">
                  <Image class="mr-2" :src="data.image" width="30" height="30" :alt="data.name" />
                  <span class="">{{ data.name }}</span>
                </div>
              </template>
            </Column>
            <Column field="price" header="Prix" style="min-width: 14rem">
              <template #body="{ data }">
                <span>{{ format.dollarPrice(data.current_price) }}</span>
              </template>
            </Column>
            <Column field="changement" header="Changement 24h" style="min-width: 14rem">
              <template #body="{ data }">
                <div class="flex align-middle items-center">
                  <font-awesome-icon class="mr-2" :class="AmountColor(data.price_change_percentage_24h, true)" icon="fa-solid fa-caret-up" />
                  <span :class="AmountColor(data.price_change_percentage_24h)">{{
                    format.percentage(data.price_change_percentage_24h.toFixed(2))
                  }}</span>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </section>
      <section class="background-connector-bottom">
        <div class="flex justify-center xs:text-center">
          <span class="xl:text-3xl xs:text-2xl font-bold my-32">{{ t('index.catchPhrase') }}</span>
        </div>
        <div class="flex flex-wrap card-container justify-around">
          <div class="card-pres max-w-md mt-8 justify-evenly rounded-lg p-4">
            <img class="gif mt-7 mb-7 w-1/2" alt="bitcoin-logo" src="/src/common/assets/images/bitcoin.svg">
            <div class="mt-7 mr-5 ml-5">
              <span class="font-bold">{{ t('index.container1.title') }} </span>
              <p class="mt-7 paragraphe">
                {{ t('index.container1.description') }}
              </p>
            </div>
          </div>
          <div class="card-pres max-w-md mt-8 justify-evenly rounded-lg p-">
            <div class="mt-7 mb-3 mr-5 ml-5">
              <span class="font-bold">{{ t('index.container2.title') }}</span>
              <p class="mt-7 paragraphe">
                {{ t('index.container2.description') }}
              </p>
            </div>
            <img class="gif w-1/2" alt="window-svg" src="/src/common/assets/images/window.svg" width="50%" height="50%">
          </div>
          <div class="card-pres max-w-md mt-8 justify-evenly rounded-lg p-">
            <img class="gif mt-7 mb-5 w-1/2" alt="dashboard-svg" src="/src/common/assets/images/dashboard.svg">
            <div class="mb-5 mr-5 ml-5">
              <span class="font-bold">{{ t('index.container3.title') }}</span>
              <p class=" mt-7 space-x-2 paragraphe text-justify font-medium">
                {{ t('index.container3.description') }}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="w-full flex flex-col justify-center background-connector">
          <div
            class="md:text-2xl xl:text-3xl sm:text-xl xs:text-xl mt-36 text-center font-bold xs:mr-5 xs:ml-5 self-center"
          >
            {{ t('index.subSlogan') }}
          </div>
          <button
            class="mb-10 button self-center xl:w-1/6 sm:w-1/2 mt-15 font-bold mb-4 mt-10 transition-all duration-200 ease-in-out" type="submit"
            @click="router.push('/register')"
          >
            {{ t('index.button') }}
          </button>
        </div>
      </section>
      <Footer />
    </div>
  </article>
</template>
<style lang="css">
.background-landing-page {
  background: linear-gradient(307.57deg, rgba(142, 110, 202, 0.29) 21.99%, rgba(255, 255, 255, 0) 75.6%);
}

.background-connector {
  background: linear-gradient(rgba(142, 110, 202, 0.29) 21.99%, rgba(255, 255, 255, 0) 75.6%);
}

.background-connector-bottom {
  background: linear-gradient(to top, rgba(142, 110, 202, 0.29) 21.99%, rgba(255, 255, 255, 0) 75.6%);
}

.background-connector-darker {
  background: linear-gradient(rgba(142, 110, 202), rgba(255, 255, 255, 0));
}

.scroller section {
  scroll-snap-align: start;
}

.gif {
  margin-left: auto;
  margin-right: auto;
}

.icon_list {
  color: #40BF6A;
}

.icon_list_minus {
  color: #DF2040;
}

.paragraphe {
  line-height: 39px;
  letter-spacing: -0.02em;
}

.sub-title {
  color: #CA9A6E !important;
}

.wave {
  height: 198px;
  background: url('/src/common/assets/images/waves.svg') repeat-x;
  animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  transform: translate3d(0, 0, 0);
}

.list-crypto {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.card-pres {
  background-color: #FAFAFA;
}

.connect-container {
  background-color: rgba(142, 110, 202, 0.98);
}

.p-datatable-wrapper {
  border-radius: 10px;
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
