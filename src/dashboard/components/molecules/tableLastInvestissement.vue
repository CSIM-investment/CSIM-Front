<script lang="ts" setup>
import { useSessionStore } from '~/authentication/stores/session'
const { t } = useI18n()
const { user } = useSessionStore()
</script>
<template>
  <div class="mt-5 text-xl font-bold text-secondary-lighter">
    {{ t("dashboard.titleLastInvests") }}
  </div>
  <p class="text-grey-dark mb-5 text-md font-medium">
    {{ t("dashboard.subtitleLastInvests") }}
  </p>
  <DataTable :value="user?.sold?.topInvestments" responsive-layout="scroll">
    <Column field="type" header="Type" />
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
</template>
