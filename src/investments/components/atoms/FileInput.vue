<script setup lang="ts">
const { t } = useI18n()
const emit = defineEmits<{
  (event: 'change', value: FileList): void
}>()

interface InputFileEvent extends Event {
  target: HTMLInputElement
}

function changeHandler(event: InputEvent): void {
  const target = event.target as HTMLInputElement

  if (target.files)
    emit('change', target.files)
}
</script>

<template>
  <input id="file" type="file" name="file" class="hidden" multiple @change="changeHandler">
  <label for="file" class="p-button button button-small">
    <slot />
  </label>
</template>
