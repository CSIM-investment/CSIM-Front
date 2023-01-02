<script lang="ts" setup>
const { t } = useI18n()
</script>

<template>
  <div class="my-10 mx-8">
    <div class="mb-10">
      <h1 class="font-bold text-4xl">
        {{ t('market.list') }}
      </h1>
      <span>{{ t('market.description') }}</span>
    </div>
    <div>
      <CryptoList />
    </div>
  </div>
</template>
