<script setup lang='ts'>

const props = defineProps<{
  modelValue: number
  symbol: string
  cryptoImage?: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="w-full bg-grey-light rounded-xl h-12 px-4 flex items-center gap-2">
    <input
      class="w-3/4 font-bold h-full rounded-xl bg-grey-light text-grey-darkest focus:outline-none"
      aria-label="input"
      :value="props.modelValue"
      type="number"
      @input="emit('update:modelValue', $event.target.value)"
    >
    <div class="w-6 h-6">
      <img v-if="props.cryptoImage" :src="props.cryptoImage" alt="">
    </div>
    <label>{{ props.symbol }}</label>
  </div>
</template>
