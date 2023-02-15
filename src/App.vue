<script setup lang="ts">
import { useHead } from '@vueuse/head'
import LazyApp from '~/LazyApp.vue'

useHead({
  title: 'CSIM',
  meta: [{ name: 'description', content: 'App title' }],
})

</script>

<template>
  <Suspense>
    <LazyApp />
  </Suspense>
</template>
