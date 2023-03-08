<script lang="ts" setup>
import Calendar from 'primevue/calendar'
import { faSquarePollVertical } from '@fortawesome/free-solid-svg-icons'
import type { Report } from '~/interfaces/report.interface'

const { t } = useI18n()
const dateFilterRange = ref<Array<Date | null>>()
const pdfPreview = ref<boolean>(false)
const pdfPreviewLink = ref<string>('')
const reportsList = [
  {
    id: 1,
    name: 'rapport-2022-10-06',
    created_at: '2022-10-06',
    pdfLink:
      'https://www.ecam.fr/wp-content/uploads/sites/3/2016/06/Exemple-fichier-PDF-1.pdf',
    csvLink:
      'https://www.ecam.fr/wp-content/uploads/sites/3/2016/06/Exemple-fichier-PDF-1.pdf',
  },
  {
    id: 2,
    name: 'rapport-2022-11-07',
    created_at: '2022-10-07',
    pdfLink:
      'https://www.ecam.fr/wp-content/uploads/sites/3/2016/06/Exemple-fichier-PDF-1.pdf',
    csvLink:
      'https://www.ecam.fr/wp-content/uploads/sites/3/2016/06/Exemple-fichier-PDF-1.pdf',
  },
] as Report[]

const displayPDFPreview = (event: any): void => {
  pdfPreviewLink.value = event.data.pdfLink
  pdfPreview.value = true
}
</script>

<template>
  <div>
    <DataTable
      :value="reportsList"
      :row-hover="true"
      :paginator="true"
      :rows="5"
      :rows-per-page-options="[5, 10, 15]"
      responsive-layout="scroll"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :row-style="'cursor: pointer'"
      @row-click="displayPDFPreview"
    >
      <template #header>
        <div class="flex flex-wrap">
          <div class="m-2">
            <Calendar
              v-model="dateFilterRange"
              :placeholder="t('investments.reports.dates')"
              selection-mode="range"
              :manual-input="false"
            />
          </div>
        </div>
      </template>
      <template #empty>
        <div class="text-center">
          <font-awesome-icon class="mr-1" :icon="faSquarePollVertical" />
          {{ t("investments.reports.empty") }}
        </div>
      </template>
      <Column
        field="name"
        :header="t('investments.reports.name')"
        :sortable="true"
      />
      <Column
        field="created_at"
        :header="t('investments.reports.created_at')"
        :sortable="true"
      />
      <Column
        field="fileLink"
        :header="t('investments.reports.download')"
        header-style="width: 13rem"
      >
        <template #body="{ data }">
          <a :href="data.csvLink" target="_blank">
            <Button icon="pi pi-download" />
          </a>
        </template>
      </Column>
    </DataTable>
    <Dialog
      v-model:visible="pdfPreview"
      :header="t('investments.reports.preview')"
      :modal="true"
      :dismissable-mask="true"
      class="w-5/6 mx-auto bg-white h-full"
    >
      <iframe title="preview" :src="pdfPreviewLink" class="w-full h-[calc(100vh-13rem)]" />
    </Dialog>
  </div>
</template>
