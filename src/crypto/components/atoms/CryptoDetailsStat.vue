<script setup lang='ts'>
const { label, stat } = defineProps<{
  label: string
  stat: string
}>()
</script>

<template>
  <div class="flex flex-col md:gap-1 gap-0.5">
    <label class="text-grey-dark text-xs md:text-base">{{ label }}</label>
    <span class="font-bold text-xs md:text-base">{{ stat }}</span>
  </div>
</template>
