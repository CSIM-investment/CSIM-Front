<script setup lang='ts'>

interface Props {
  placeholder?: string
  errorMessage?: string
  class?: string
  modelValue: string
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
    <label />
    <InputText
      :class="['text-input', ...props.class.split(' ')]"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      type="text"
      @input="emit('update:modelValue', $event.target.value)"
    />
    <small class="p-error h-4 block">{{ props.errorMessage }}</small>
  </div>
</template>
