<script lang="ts" setup>
import { faNewspaper, faWallet, faChartLine } from '@fortawesome/free-solid-svg-icons';
</script>
<template>
  <div class="relative top-0 bg-white h-16 w-full flex justify-between bg-main-secondary">
    <RouterLink to="#" class="flex justify-center p-2 md:ml-8">
      <img src="src/common/assets/images/CSIM.svg" alt="csim-logo" />
    </RouterLink>
    <div class="flex justify-center items-center text-white p-2 md:mr-8">
      <div class="hidden md:flex mr-8">
        <RouterLink class="py-4 px-6" to="#">market</RouterLink>
        <RouterLink class="py-4 px-6" to="">exchange</RouterLink>
        <RouterLink class="py-4 px-6" to="">wallet</RouterLink>
      </div>
      <div class="flex flex-col text-xs">
        <small class="hidden md:block">Welcome</small>
        <span class="text-xs font-bold">Michael Smith</span>
      </div>
      <div class="ml-2">
        <img src="src/common/assets/images/user.png" alt="user-photo" />
      </div>
    </div>
  </div>
  <div
    class="flex justify-around bg-main-secondary text-white text-center absolute z-50 w-full bottom-0 text-xl cursor-pointer md:hidden"
  >
    <RouterLink to="#" class="w-1/3 py-3 hover:text-main-primary group">
      <div class="max-w-fit mx-auto">
        <font-awesome-icon :icon="faNewspaper" />
        <hr class="invisible group-hover:visible" />
      </div>
    </RouterLink>
    <RouterLink to="#" class="w-1/3 py-3 hover:text-main-primary group">
      <div class="max-w-fit mx-auto">
        <font-awesome-icon :icon="faWallet" />
        <hr class="invisible group-hover:visible" />
      </div>
    </RouterLink>
    <RouterLink to="#" class="w-1/3 py-3 hover:text-main-primary group">
      <div class="max-w-fit mx-auto">
        <font-awesome-icon :icon="faChartLine" />
        <hr class="invisible group-hover:visible" />
      </div>
    </RouterLink>
  </div>
</template>
