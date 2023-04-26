<script lang="ts" setup>
import Calendar from 'primevue/calendar'
import { faSquarePollVertical } from '@fortawesome/free-solid-svg-icons'
import { computed } from 'vue'
import { DataTableRowClickEvent } from 'primevue/datatable'
import { format } from '~/support/format'
import {
  useCreateInvestmentReportMutation,
  useGetReportsListQuery,
} from '~/common/generated/graphql'

const { t } = useI18n()
const createRange = ref<Array<Date> | null>()
const pdfPreview = ref<boolean>(false)
const createModal = ref<boolean>(false)
const pdfPreviewLink = ref<string>('')

const { result, error, loading, refetch } = useGetReportsListQuery({
  options: {},
})

const { mutate: createInvestmentReport, loading: generateLoading } = useCreateInvestmentReportMutation({})

const reportsList = computed(() => {
  return result?.value?.reports ?? []
})

const totalReports = computed(() => {
  return result?.value?.reports.length ?? 0
})

const displayPDFPreview = (event: any): void => {
  pdfPreviewLink.value = event.data.pdfLink
  pdfPreview.value = true
}

const generateReport = async(): Promise<void> => {
  try {
    await createInvestmentReport({
      options: {
        fromDate: createRange.value?.[0],
        toDate: createRange.value?.[1],
      },
    })
    refetch()
  }
  catch (e) {
    console.error(e)
  }
  createModal.value = false
}
</script>

<template>
  <div>
    <DataTable
      :value="reportsList"
      :row-hover="true"
      :paginator="true"
      :rows="5"
      :loading="!!loading"
      :total-records="totalReports"
      :rows-per-page-options="[5, 10, 15]"
      responsive-layout="scroll"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :row-style="'cursor: pointer'"
      @row-click="displayPDFPreview as DataTableRowClickEvent"
    >
      <template #header>
        <div class="flex flex-wrap">
          <div class="flex items-center">
            <Button :label="t('investments.reports.generateReport')" icon="pi pi-file" @click="createModal = true" />
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
        field="fromDate"
        :header="t('investments.reports.period')"
        :sortable="true"
      >
        <template #body="{ data }">
          {{
            t('investments.reports.fromTo', {
              from: format.date(new Date(data.fromDate)),
              to: format.date(new Date(data.toDate))}
            )
          }}
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
    <Dialog
      v-model:visible="createModal"
      :header="t('investments.reports.selectPeriod')"
      :modal="true"
      :dismissable-mask="true"
      class="mx-auto bg-white"
    >
      <div class="flex flex-col">
        <div class="m-2">
          <Calendar
            v-model="createRange"
            class="w-full"
            :placeholder="t('investments.reports.period')"
            selection-mode="range"
            :manual-input="false"
          />
        </div>
        <div class="m-2 flex justify-end">
          <Button
            :label="t('investments.reports.generate')"
            icon="pi pi-pencil"
            :loading="!!generateLoading"
            @click="generateReport"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<style scoped lang="scss">
::v-deep(.p-paginator) {
  justify-content: end;
}
</style>
