<script setup lang="ts">
const { t } = useI18n()
const emit = defineEmits(['change'])

function changeHandler(e) {
  emit('change', e.target.files)
}
</script>

<template>
  <input id="file" type="file" name="file" class="hidden" multiple @change="changeHandler">
  <label for="file" class="p-button button button-small"><slot /></label>
</template>

<style scoped>

</style>
