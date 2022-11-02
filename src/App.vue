<script setup lang="ts">
import { useHead } from '@vueuse/head'
useHead({
  title: 'App title',
  meta: [{ name: 'description', content: 'App title' }],
})
</script>

<template>
  <RouterView />
</template>
