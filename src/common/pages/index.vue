<script setup lang="ts">
const columns = ref([
  { field: 'nom', header: 'Nom' },
  { field: 'price', header: 'Prix' },
  { field: 'changement', header: 'Changement 24h' },
])

const data = ref([
  {
    id: '1000',
    nom: {
      image: '/public/bitcoin.png',
      nom: 'Bitcoin',
    },
    price: '47,412.65',
    changement: {
      symbole: '+',
      amount: '1.65 %',
    },
  },
  {
    id: '1001',
    nom: {
      image: '/public/etherium.png',
      nom: 'Etherium',
    },
    price: '47,412.65',
    changement: {
      symbole: '+',
      amount: '1.65 %',
    },
  },
  {
    id: '1002',
    nom: {
      image: '/public/litecoin.png',
      nom: 'Litecoin',
    },
    price: '47,412.65',
    changement: {
      symbole: '-',
      amount: '1.65 %',
    },
  },
])

function AmountColor(data: any) {
  if (data.symbole === '+')
    return 'icon_list'
  else
    return 'icon_list_minus'
}
</script>
<template>
  <div class="flex-col">
    <!-- Page d'acceuil -->
    <section class="flex-col background-landing-page pt-10">
      <div class="flex-col text-center pt-10">
        <h1 class="md:text-5xl xl:text-6xl sm:text-4xl xs:text-3xl font-black">
          Le chemin le plus rapide et efficace pour
        </h1>
        <h2 class="xl:text-5xl md:text-4xl sm:text-3xl xs:text-3xl font-black pt-5 sub-title text-color-grey">
          Gérer, Suivre & Echanger
        </h2>
        <p class="pt-5">
          L'endroit où vous pouvez controller et suivre les cryptommonaies pour mieux investir.
        </p>
        <Button class="button-landing-page xl:w-1/6 xs:2/6 mt-15 font-bold mb-4 mt-10" type="submit">
          Se connecter
        </Button>
      </div>
      <div class="mt-10 mb-10 flex justify-center">
        <div class="flex items-center pr-10">
          <img src="/public/bitcoin.png" class="mr-3" width="40px" height="40px">
          <span> Bitcoin </span>
        </div>
        <div class="flex items-center pr-10">
          <img src="/public/etherium.png" class="mr-3" width="40px" height="40px">
          <span> Etherium </span>
        </div>
        <div class="flex items-center">
          <img src="/public/litecoin.png" class="mr-3" width="40px" height="40px">
          <span> Litecoin </span>
        </div>
      </div>
      <div class="bottom-0 w-full transition-all duration-300 ease-in-out delay-150 ">
        <span />
        <div class="wave mt-10" />
      </div>
    </section>
    <div class="flex-col list-crypto">
      <DataTable class="rounded-lg" :value="data" responsive-layout="scroll">
        <Column field="nom" header="Nom" style="min-width: 14rem">
          <template #body="{ data }">
            <div class="flex">
              <Image class="mr-2" :src="data.nom.image" width="30" height="30" :alt="data.nom.nom" />
              <span class="">{{ data.nom.nom }}</span>
            </div>
          </template>
        </Column>
        <Column field="price" header="Prix" style="min-width: 14rem">
          <template #body="{ data }">
            <span>{{ data.price }}</span>
          </template>
        </Column>
        <Column field="changement" header="Changement 24h" style="min-width: 14rem">
          <template #body="{ data }">
            <div class="flex align-middle items-center">
              <font-awesome-icon class="mr-2" :class="AmountColor(data.changement)" icon="fa-solid fa-caret-up" />
              <span :class="AmountColor(data.changement)"> {{ data.changement.symbole }} {{
                  data.changement.amount
              }}</span>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="flex justify-center xs:text-center">
      <span class="xl:text-3xl xs:text-2xl font-bold mb-7">Mieux gérer vos cryptomonnaies avec CSIM</span>
    </div>
    <div class="xl:flex-row md:flex-row sm:flex-row flex xs:flex-col card-container justify-around mb-10">
      <div class="card-pres flex-col flex xl:w-1/4 xs:w-full xs:mt-7 mt-8 justify-evenly rounded-lg">
        <img class="gif mt-7 mb-7" src="/src/common/assets/images/bitcoin.svg" width="50%" height="50%">
        <div class="mt-7 mr-5 ml-5">
          <span class="font-bold">Regarder les cryptomonaie avec CSIM market</span>
          <p class="mt-7 paragraphe">
            Regarder toutes les cryptommaie avec le market. Regarder les dernières tendances pour investire au mieux
            dans
            votre cryptomonnaie préferé.
          </p>
        </div>
      </div>
      <div class="card-pres xl:w-1/4 xs:mt-7 flex flex-col justify-evenly rounded-lg">
        <div class="mt-7 mb-3 mr-5 ml-5">
          <span class="font-bold">Suivez à l’instant les news de vos cryptomonnaie préférées</span>
          <p class="mt-7 paragraphe">
            Profiter des dernières news de vos crpyotmmaies. Vous resterez toujours à jour grâce aux news
            crypto.
          </p>
        </div>
        <img class="gif" src="/src/common/assets/images/window.svg" width="50%" height="50%">
      </div>
      <div class="card-pres xl:w-1/4 xs:w-full flex flex-col mt-8 justify-evenly rounded-lg">
        <img class="gif mt-7 mb-5" src="/src/common/assets/images/dashboard.svg" width="50%" height="50%">
        <div class="mb-5 mr-5 ml-5">
          <span class="font-bold">Rester maître de votre wallet avec CSIM</span>
          <p class=" mt-7 space-x-2 paragraphe text-justify font-medium">
            Gérer votre budgt de cryptommaie. Voir dans quoi vous avez
            investie et les dernieres transactions. Rester maître de votre wallet.
          </p>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col justify-center connect-container">
      <div
        class="md:text-2xl xl:text-3xl sm:text-xl xs:text-xl mt-10 text-center font-bold text-white xs:mr-5 xs:ml-5 self-center">
        Commencez à investir dans les cryptomonnaies maintenant !
      </div>
      <Button class="mb-10 button-landing-page self-center xl:w-1/6 sm:w-1/2 mt-15 font-bold mb-4 mt-10" type="submit">
        Se connecter
      </Button>
    </div>
    <Footer />
  </div>
</template>
<style lang="css">
.background-landing-page {
  background: linear-gradient(307.57deg, rgba(142, 110, 202, 0.29) 21.99%, rgba(255, 255, 255, 0) 75.6%);
}

.gif {
  margin-left: auto;
  margin-right: auto;
}

.icon_list {
  color: #40BF6A;
}

.icon_list_minus {
  color: #DF2040;
}

.paragraphe {
  line-height: 39px;
  letter-spacing: -0.02em;
}

.sub-title {
  color: #CA9A6E !important;
}

.wave {
  height: 198px;
  background: url('/src/common/assets/images/waves.svg') repeat-x;
  animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  transform: translate3d(0, 0, 0);
}

.list-crypto {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 50%;
  margin: 20px auto;
}

.card-pres {
  background-color: #FAFAFA;
}

.connect-container {
  background-color: rgba(142, 110, 202, 0.98);
}

.p-datatable-wrapper {
  border-radius: 10px;
}

@keyframes wave {
  0% {
    margin-left: 0;
  }

  100% {
    margin-left: -1600px;
  }
}
</style>
