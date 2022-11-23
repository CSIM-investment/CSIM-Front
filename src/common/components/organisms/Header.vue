<script lang="ts" setup>
</script>
<template>
  <div class="relative top-0 h-16 w-full flex justify-between">
    <RouterLink to="#" class="flex justify-center p-2 md:ml-8">
      <img src="/src/common/assets/images/CSIM.svg" alt="csim-logo">
    </RouterLink>
    <div class="flex justify-center items-center p-2 md:mr-8">
      <div class="hidden md:flex mr-8">
        <RouterLink class="py-4 px-6 hover:text-main-primary" to="market">
          Market
        </RouterLink>
        <RouterLink class="py-4 px-6 hover:text-main-primary" to="exchange">
          Exchange
        </RouterLink>
        <RouterLink class="py-4 px-6 hover:text-main-primary" to="wallet">
          Wallet
        </RouterLink>
      </div>
      <div class="flex flex-col text-xs">
        <small class="hidden md:block">Welcome</small>
        <span class="text-xs font-bold">Michael Smith</span>
      </div>
      <div class="ml-2">
        <img src="/src/common/assets/images/user.png" alt="user-photo">
      </div>
    </div>
  </div>
</template>
