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
    <div class="grid lg:grid-cols-2">
      <div class="dashboard bg-grey-lighter col-span-3 flex flex-col">
        <div class="dashboard__container h-full mx-8 my-8 flex flex-col">
          <h1 class="text-4xl font-bold">
            {{ t("dashboard.title") }}
          </h1>
          <p class="text-grey-dark mt-2 text-md font-medium">
            {{ t("dashboard.subtitle") }}
          </p>
          <div class="md:grid md:grid-cols-5 xl:gap-8 mx-8">
            <cardSolde />
            <div class="md:col-span-3 lg:hidden px-8 py-5 text-white flex" />
            <CardDoughnut />
          </div>
          <DashboardFavorites />
          <TableLastInvestissement />
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
  layout: admin
  </route>
