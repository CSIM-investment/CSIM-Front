<script setup lang="ts">
import { useHead } from '@vueuse/head'
useHead({
  title: 'CSIM',
  meta: [{ name: 'description', content: 'App title' }],
})
</script>

<template>
  <RouterView />
</template>
