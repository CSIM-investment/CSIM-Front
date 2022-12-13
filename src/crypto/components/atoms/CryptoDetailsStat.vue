<script setup lang='ts'>
const { label, stat } = defineProps<{
  label: string
  stat: string
}>()
</script>

<template>
  <div class="flex flex-col md:gap-1 xs:gap-0.5">
    <label class="text-grey-dark xs:text-xs md:text-base">{{ label }}</label>
    <span class="font-bold xs:text-xs md:text-base">{{ stat }}</span>
  </div>
</template>
