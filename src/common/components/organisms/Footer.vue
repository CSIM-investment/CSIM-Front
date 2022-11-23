<template>
  <div class="w-full flex justify-around md:justify-between pb-14 md:pb-0">
    <div class="w-24 md:w-60">
      <RouterLink to="#">
        <img class="w-14 md:w-20 mx-auto my-14" src="/src/common/assets/images/CSIM.svg" alt="csim-logo" />
      </RouterLink>
    </div>
    <div class="flex justify-around text-black justify-center text-white text-xs md:text-sm mt-8 w-2/3 md:w-1/2">
      <div class="flex flex-col">
        <h3 class="font-bold">
          Company
        </h3>
        <RouterLink class="mt-2 hover:text-main-primary" to="about">
          About us
        </RouterLink>
        <RouterLink class="mt-2 hover:text-main-primary" to="contact">
          Contact us
        </RouterLink>
      </div>
      <div class="flex flex-col">
        <h3 class="font-bold">
          Company
        </h3>
        <RouterLink class="mt-2 hover:text-main-primary" to="cgu">
          CGU
        </RouterLink>
        <RouterLink class="mt-2 hover:text-main-primary" to="cookies">
          Cookies
        </RouterLink>
        <RouterLink class="mt-2 hover:text-main-primary" to="terms">
          Terms and Privacy
        </RouterLink>
      </div>
    </div>
  </div>
</template>
