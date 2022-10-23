<template>
  <div
    class="bg-main-secondary absolute z-0 bottom-0 w-full flex justify-around md:justify-between pb-14 md:pb-0"
  >
    <div class="w-24 md:w-60">
      <RouterLink to="#">
        <img class="w-20 mx-auto my-14" src="src/common/assets/images/CSIM.svg" alt="csim-logo" />
      </RouterLink>
    </div>
    <div class="flex justify-around justify-center text-white text-md mt-8 w-2/3 md:w-1/2">
      <div class="flex flex-col">
        <h3 class="font-bold">Company</h3>
        <RouterLink class="mt-2" to="#">About us</RouterLink>
        <RouterLink class="mt-2" to="#">Contact us</RouterLink>
      </div>
      <div class="flex flex-col">
        <h3 class="font-bold">Company</h3>
        <RouterLink class="mt-2" to="#">CGU</RouterLink>
        <RouterLink class="mt-2" to="#">Cookies</RouterLink>
        <RouterLink class="mt-2" to="#">Terms and Privacy</RouterLink>
      </div>
    </div>
  </div>
</template>
