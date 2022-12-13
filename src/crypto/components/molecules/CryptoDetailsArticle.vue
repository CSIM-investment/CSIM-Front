<script setup lang='ts'>

const props = defineProps<{
  // TODO To be defined when articles query is ready
  article: any
}>()
</script>

<template>
  <article class="flex flex-wrap">
    <div class="w-3/4">
      <header class="flex flex-col gap-2 max-w-md">
        <h2 class="uppercase font-bold text-2xl">
          {{ props.article.name }}
        </h2>
        <h3 class=" font-bold text-md">
          {{ props.article.heading }}
        </h3>
        <p>{{ props.article.description }}</p>
      </header>
    </div>
    <img class="w-1/4" :src="props.article.image" :alt="props.article.name">
    <footer class="font-semibold w-full">
      <a rel="author" class="text-primary">{{ props.article.author }}</a>
      —
      <time datetime="2011-08-28" title="August 28th, 2011">8/28/11</time>
    </footer>
  </article>
</template>
<style scoped>

</style>
