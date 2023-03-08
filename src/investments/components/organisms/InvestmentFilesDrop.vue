<script setup lang="ts">
const { t } = useI18n()

const emit = defineEmits(['templateDownload'])

const filesToUpload = ref<File[]>([])
const areFilesDraggedOver = ref(false)
const dragCounter = ref(0)

function dropHandler(event) {
  event.preventDefault()
  areFilesDraggedOver.value = false
  filesToUpload.value = [...filesToUpload.value, ...event.dataTransfer.files]
}

function dragEnterHandler(event) {
  event.preventDefault()
  dragCounter.value++
  areFilesDraggedOver.value = true
}

function dragLeaveHandler(event) {
  event.preventDefault()
  dragCounter.value--
  if (dragCounter.value === 0)
    areFilesDraggedOver.value = false
}

function fileAdd(files: File[]) {
  filesToUpload.value = [...filesToUpload.value, ...files]
}

function removeFile(index: number) {
  filesToUpload.value = filesToUpload.value.filter((_, i) => i !== index)
}
</script>

<template>
  <div>
    <div class="flex gap-2 bg-grey p-4 rounded-t-xl">
      <FileInput @change="fileAdd">
        {{ t('investment.drop.select') }}
      </FileInput>
      <Button
        v-tooltip.top="t('investment.drop.template-tooltip')"
        class="button button-small p-button-success button-icon-only"
        icon="pi pi-save"
      />
      <Button
        v-tooltip.top="t('investment.drop.template-tooltip')"
        class="button button-small p-button-danger button-icon-only"
        icon="pi pi-trash"
      />
      <Button
        v-tooltip.top="t('investment.drop.template-tooltip')"
        class="button button-small button-icon-only ml-auto"
        icon="pi pi-file-excel"
        @click="() => emit('templateDownload')"
      />
    </div>
    <div
      class="bg-white h-40 rounded-b-xl p-2"
    >
      <div
        class="rounded-b-xl border-2 w-full h-full flex justify-center items-center p-4"
        :class="{
          'border-solid border-primary bg-primary-lighter': areFilesDraggedOver,
          'border-dashed border-grey': !areFilesDraggedOver,
        }"
        @drop="dropHandler"
        @dragover="event => event.preventDefault()"
        @dragenter="dragEnterHandler"
        @dragleave="dragLeaveHandler"
      >
        <p v-if="filesToUpload.length === 0">
          {{ t('investment.drop.placeholder') }}
        </p>
        <div v-else class="flex gap-2">
          <Chip v-for="(file, index) in filesToUpload" :key="file.name" @remove="() => removeFile(index)">
            {{ file.name }}
          </Chip>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
