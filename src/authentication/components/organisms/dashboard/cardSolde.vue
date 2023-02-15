<template>
  <div class="flex card-solde px-8 py-5 text-white flex flex-col">
    <div class="card-solde__title text-md mb-3 font-bold">
      Solde
    </div>
    <div class="card-solde__content flex font-bold justify-between items-center mb-3">
      <div class="text-md flex align-center items-center">
        <i class="pi pi-wallet pr-5 !text-2xl"/>
        <span class="!text-xl">$ 4000, 20</span>
      </div>
      <div class="card-solde__content__stat bg-green px-1">
        <i class="pi pi-check card-solde__content__stat__icon !text-sm"></i>
        <span class="card-solde__content__stat__percentage text-sm">+ 1,6%</span>
      </div>
    </div>
    <div class="card-solde__price flex mx-auto">
      <div>
        <div>
          <i class="pi pi-angle-down !text-sm mr-2"/>
          <span class="!text-sm">Revenu</span>
        </div>
        <span class="!text-sm">$ 4000,20 </span>
      </div>
      <Divider style="background-color:lightgrey; width: 1px" layout="vertical" class="divider"/>
      <div>
        <div>
          <i class="pi pi-search !text-sm mr-2"/>
          <span class="text-sm">Dépenses</span>
        </div>
        <span class="text-sm">$ 4000,20 </span>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.card-solde {
  background: linear-gradient(90.28deg, #9D6FF3 -2.78%, rgba(250, 93, 162, 0.28) 99.83%);
  box-shadow: 0px 2px 4px #FFCEE3;
  border-radius: 20px;
}

.card-solde__content__stat {
  display: flex;
  align-items: center;
  background: rgba(0, 255, 84, 0.39);
  border-radius: 30px;
  height: fit-content;

  &__percentage, &__icon {
    color: #40654C;
  }
}
</style>