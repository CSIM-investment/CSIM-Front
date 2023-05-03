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
      <div v-if="user?.sold?.topInvestments && user?.sold?.topInvestments?.length > 0" class="flex w-1/3 justify-between flex-wrap">
        <div
          v-for="investment in user?.sold?.topInvestments"
          :key="investment.id" class=""
        >
          <div class="flex items-center">
            <span class="w-3 h-3 rounded-xl bg-primary" />
            <p class="text-grey-dark ml-2 text-md font-medium">
              {{ investment?.quoteCurrency?.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
