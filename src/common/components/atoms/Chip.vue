<script setup lang="ts">
import { faClose } from '@fortawesome/free-solid-svg-icons'
const emit = defineEmits(['remove'])
</script>

<template>
  <div class="rounded-xl p-2 bg-grey flex gap-2 justify-center items-center">
    <span class="">
      <slot />
    </span>
    <font-awesome-icon class="mr-1" :icon="faClose" @click="() => emit('remove')" />
  </div>
</template>

<style scoped>

</style>
