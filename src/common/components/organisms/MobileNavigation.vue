<script lang="ts" setup>
import { faNewspaper, faWallet, faChartLine } from '@fortawesome/free-solid-svg-icons';
</script>
<template>
  <div class="relative top-0 bg-white h-14 w-full flex justify-between bg-main-secondary">
    <div class="flex justify-center p-2">
      <img class="" src="src/common/assets/images/CSIM.svg" alt="" />
    </div>
    <div class="flex justify-center items-center text-white p-2">
      <div><span class="text-sm">Michael Smith</span></div>
      <div class="ml-2">
        <img src="src/common/assets/images/user.png" alt="" />
      </div>
    </div>
  </div>
  <div
    class="flex justify-around bg-main-secondary text-white text-center absolute w-full bottom-0 text-xl cursor-pointer"
  >
    <div class="w-1/3 py-3 hover:text-main-primary group">
      <div class="max-w-fit mx-auto">
        <font-awesome-icon :icon="faNewspaper" />
        <hr class="invisible group-hover:visible" />
      </div>
    </div>
    <div class="w-1/3 py-3 hover:text-main-primary group">
      <div class="max-w-fit mx-auto">
        <font-awesome-icon :icon="faWallet" />
        <hr class="invisible group-hover:visible" />
      </div>
    </div>
    <div class="w-1/3 py-3 hover:text-main-primary group">
      <div class="max-w-fit mx-auto">
        <font-awesome-icon :icon="faChartLine" />
        <hr class="invisible group-hover:visible" />
      </div>
    </div>
  </div>
</template>
