<script setup lang='ts'>
const input = ref('')

interface Props {
  placeholder?: string
  errorMessage?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="w-full">
    <Password
      aria-label="Password"
      v-model="input"
      :placeholder="props.placeholder"
      :class="['password-input', ...props.class.split(' ')]"
      toggle-mask
      :feedback="false"
      @input="emit('update:modelValue', $event.target.value)"
    />
    <small class="p-error h-4 block">{{ props.errorMessage }}</small>
  </div>
</template>
