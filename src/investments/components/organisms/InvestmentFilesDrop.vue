<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { ref as storageRef } from 'firebase/storage'
import { useImportInvestmentMutation } from '~/common/generated/graphql'
import type FileInput from '~/investments/components/atoms/FileInput.vue'

const { t } = useI18n()
const storage = useFirebaseStorage()
const toast = useToast()

const emit = defineEmits<{
  (event: 'templateDownload'): void
  (event: 'filesImported'): void
}>()

const filesInputRef = ref<InstanceType<typeof FileInput>> (null)
const filesToUpload = ref<File[]>([])
const areFilesUploading = ref(false)
const areFilesDraggedOver = ref(false)
const dragCounter = ref(0)

const { mutate: importInvestment } = useImportInvestmentMutation({})

function dropHandler(event: DragEvent): void {
  event.preventDefault()
  areFilesDraggedOver.value = false

  if (!event.dataTransfer?.files)
    return

  filesToUpload.value = [...filesToUpload.value, ...event.dataTransfer.files]
}

function dragEnterHandler(event: DragEvent): void {
  event.preventDefault()
  dragCounter.value++
  areFilesDraggedOver.value = true
}

function dragLeaveHandler(event: DragEvent): void {
  event.preventDefault()
  dragCounter.value--
  if (dragCounter.value === 0)
    areFilesDraggedOver.value = false
}

function fileAdd(files: File[]): void {
  filesToUpload.value = [...filesToUpload.value, ...files]
}

function removeFile(index: number): void {
  filesToUpload.value = filesToUpload.value.filter((_, i) => i !== index)
}

function removeFiles(): void {
  const filesInputElement = filesInputRef.value?.filesInputRef as HTMLInputElement
  filesToUpload.value = []
  filesInputElement.value = ''
}

async function filesSave(): Promise<void> {
  const investmentsLinks: string[] = []
  areFilesUploading.value = true

  for (const fileToUpload of filesToUpload.value) {
    const investmentFolderRef = storageRef(storage, `investments/${Date.now()}`)

    const { upload, uploadError, url, refresh } = useStorageFile(investmentFolderRef)
    await upload(fileToUpload)
    await refresh()

    if (uploadError.value)
      toast.add({ detail: `there was an error saving ${fileToUpload.name}`, severity: 'error' })
    else if (url.value)
      investmentsLinks.push(url.value)
  }

  for (const link of investmentsLinks)
    await importInvestment({ link })

  toast.add({ detail: 'files successfully imported !', severity: 'success' })
  areFilesUploading.value = false
  emit('filesImported')
}
</script>

<template>
  <div>
    <div class="flex gap-2 bg-grey p-4 rounded-t-xl">
      <FileInput ref="filesInputRef" @change="fileAdd">
        {{ t('investments.investments.drop.select') }}
      </FileInput>
      <Button
        v-if="filesToUpload.length"
        aria-label="save"
        class="button button-small p-button-success button-icon-only"
        icon="pi pi-save"
        :loading="areFilesUploading"
        @click="filesSave"
      />
      <Button
        aria-label="remove"
        v-if="filesToUpload.length"
        class="button button-small p-button-danger button-icon-only"
        icon="pi pi-trash"
        @click="removeFiles"
      />
      <Button
        v-tooltip.top="t('investments.investments.drop.template-tooltip')"
        aria-label="download"
        class="button button-small button-icon-only ml-auto"
        icon="pi pi-file-excel"
        @click="emit('templateDownload')"
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
          {{ t('investments.investments.drop.placeholder') }}
        </p>
        <div v-else class="flex gap-2">
          <Chip v-for="(file, index) in filesToUpload" :key="file.name" @remove="removeFile(index)">
            {{ file.name }}
          </Chip>
        </div>
      </div>
    </div>
  </div>
</template>
