<script setup lang="ts">
import { useSessionStore } from '~/authentication/stores/session'

const { fetchSession } = useSessionStore()

const isSessionLoading = ref(true)
await fetchSession()
isSessionLoading.value = false
</script>

<template>
  <LoadingPage v-if="isSessionLoading" />
  <RouterView v-else />
  <Toast />
</template>
