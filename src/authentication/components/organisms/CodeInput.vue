<script setup lang="ts">
const { t } = useI18n()

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])

const CODE_LENGTH = 6
const code = computed<string[]>(() => props.modelValue.split(''))

const inputRefs = $ref<HTMLInputElement[]>([])
function setInputRef(element: HTMLInputElement) {
  inputRefs.push(element)
}

function onInput(index: number) {
  const value = inputRefs[index].value
  emit('update:modelValue', code.value.join(''))

  if (value.length === 1)
    focusInput(index + 1)
}

function focusInput(index: number) {
  if (index < 0 || index >= CODE_LENGTH)
    return

  inputRefs[index].focus()
}

function pasteCode(event: ClipboardEvent) {
  if (!event.clipboardData)
    return

  const pastedCode = Number((event.clipboardData.getData('text')).trim())
  if (isNaN(pastedCode) && pastedCode.toString().length !== CODE_LENGTH)
    return

  emit('update:modelValue', pastedCode.toString())
}
</script>

<template>
  <div class="flex gap-6">
    <input
      v-for="(_, codeIndex) in CODE_LENGTH"
      :ref="setInputRef"
      :key="codeIndex"
      v-model="code[codeIndex]"
      :autofocus="codeIndex === 0"
      class="w-20 h-24 text-5xl bg-grey text-center font-bold appearance-none"
      :data-index="codeIndex"
      type="number"
      maxlength="1"
      max="9"
      @focus="$event.target.select()"
      @keydown.up.prevent
      @keydown.down.prevent
      @keyup.left="focusInput(codeIndex - 1)"
      @keyup.right="focusInput(codeIndex + 1)"
      @keyup.delete="focusInput(codeIndex - 1)"
      @paste.prevent="pasteCode"
      @input="onInput(codeIndex)"
    >
  </div>
</template>

<style scoped lang="postcss">
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

input:focus {
  outline: none;
  @apply border-primary border-4;
  transform: translateY(-5px);
  transition: transform 0.2s ease-in-out;
}
</style>
