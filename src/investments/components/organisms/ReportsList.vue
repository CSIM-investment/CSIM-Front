<script lang="ts" setup>
import Calendar from 'primevue/calendar'
import { faCalendarPlus, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons'
import { computed } from 'vue'
import { DataTableRowClickEvent } from 'primevue/datatable'
import type { Report } from '~/interfaces/report.interface'
import type { InvestmentsReportsEntity } from '~/common/generated/graphql'
import {
  useCreateInvestmentReportMutation,
  useGetReportsListQuery,
  useToggleFavoriteCryptoMutation,
} from '~/common/generated/graphql'

const { t } = useI18n()
const dateFilterRange = ref<Array<Date | null>>()
const pdfPreview = ref<boolean>(false)
const pdfPreviewLink = ref<string>('')

const { result, error, loading, refetch } = useGetReportsListQuery({
  options: {
  },
})

const { mutate: createInvestmentReport } = useCreateInvestmentReportMutation({})

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
      @row-click="displayPDFPreview as DataTableRowClickEvent"
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
          <div class="m-2 ml-6 flex justify-center items-center text-secondary-light hover:text-secondary  cursor-pointer">
            <font-awesome-icon size="2xl" class="mr-1" :icon="faCalendarPlus" />
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

<style scoped lang="scss">
::v-deep(.p-paginator) {
  justify-content: end;
}
</style>
