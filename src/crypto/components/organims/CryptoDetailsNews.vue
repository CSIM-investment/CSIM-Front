<script setup lang='ts'>
const news = ref([
  {
    name: 'LE PROGRÈS',
    heading: 'Coinbase slips 7%, Silvergate sinks over 4% as equities have another down day',
    description: 'Le jeune dirigeant de la plateforme d\'échange de cryptomonnaies FTX aux ambitions messianiques a coulé son empire en moins d\'une semaine',
    author: 'Gérard Horny',
    createdAt: '2022-29-11',
    image: 'https://picsum.photos/300/150',
  },
  {
    name: 'LE PROGRÈS',
    heading: 'Coinbase slips 7%, Silvergate sinks over 4% as equities have another down day',
    description: 'Le jeune dirigeant de la plateforme d\'échange de cryptomonnaies FTX aux ambitions messianiques a coulé son empire en moins d\'une semaine',
    author: 'Gérard Horny',
    createdAt: '2022-29-11',
    image: 'https://picsum.photos/300/150',
  },
])
</script>

<template>
  <div class="flex flex-col gap-12 p-4">
    <CryptoDetailsArticle v-for="article in news" :key="article.name" :article="article" />
  </div>
</template>
<style scoped>

</style>
