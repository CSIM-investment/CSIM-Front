<script lang="ts" setup>
import { useSessionStore } from '~/authentication/stores/session'
const { user } = useSessionStore()
</script>

<template>
  <div class="bg-white col-span-3 px-8 py-5">
    <h1 class="font-medium">
      Top de vos investments
    </h1>
    <div class="flex">
      <doughnuts class="max-h-32 w-1/3" />
      <div v-if="user?.sold?.latestBigInvestments && user?.sold?.latestBigInvestments?.length > 0" class="flex-col flex-1 w-1/3 justify-between flex-wrap">
        <div
            v-for="investment in user?.sold?.latestBigInvestments"
            :key="investment.id" class=""
        >
          <div class="flex items-center justify-center">
            <p class="text-grey-dark ml-2 text-md font-medium">
              {{ investment.valueBaseCurrency.toFixed(2) }}
            </p>
            <img class="h-8" :src="investment.baseCurrency.image"/>
            <p class="text-grey-dark ml-2 text-md font-medium"> ==></p>
            <p class="text-grey-dark ml-2 text-md mr-2 font-medium">{{investment.valueQuoteCurrency.toFixed(2)}} </p>
            <img class="h-6" :src="investment.quoteCurrency.image"/>
          </div>
        </div>
      </div>
      <div v-else class="flex items-center">
        <p> Aucun investissement </p>
      </div>
    </div>
  </div>
</template>
