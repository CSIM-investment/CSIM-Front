<script lang="ts" setup>
const { t } = useI18n()
</script>
<template>
  <div class="relative top-0 h-16 w-full flex justify-between">
    <RouterLink to="/" class="flex justify-center p-2 md:ml-8">
      <img src="/src/common/assets/images/CSIM.svg" alt="csim-logo">
    </RouterLink>
    <div class="flex justify-center items-center p-2 md:mr-8">
      <div class="hidden md:flex mr-8">
        <RouterLink class="py-4 px-6 hover:text-main-primary" to="market">
          {{ t('header.market') }}
        </RouterLink>
        <RouterLink class="py-4 px-6 hover:text-main-primary" to="exchange">
          {{ t('header.exchange') }}
        </RouterLink>
        <RouterLink class="py-4 px-6 hover:text-main-primary" to="news">
          {{ t('header.news') }}
        </RouterLink>
      </div>
      <div class="flex flex-col text-xs">
        <small class="hidden md:block">{{ t('header.welcome') }}</small>
        <span class="text-xs font-bold">Michael Smith</span>
      </div>
      <div class="ml-2">
        <img src="/src/common/assets/images/user.png" alt="user-photo">
      </div>
    </div>
  </div>
</template>
