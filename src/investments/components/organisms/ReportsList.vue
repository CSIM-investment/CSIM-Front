<script lang="ts" setup>
import Calendar from 'primevue/calendar'
import { faSquarePollVertical } from '@fortawesome/free-solid-svg-icons'
import type { Report } from '~/interfaces/report.interface'

const dateFilterRange = ref<Array<Date | null>>()
const reportsList = [
  {
    id: 1,
    name: 'rapport-2022-10-06.pdf',
    created_at: '2022-10-06',
    fileLink: 'https://www.google.com',
  },
  {
    id: 2,
    name: 'rapport-2022-11-07.pdf',
    created_at: '2022-10-07',
    fileLink: 'https://www.google.com',
  },
] as Report[]
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
    >
      <template #header>
        <div class="flex flex-wrap">
          <div class="m-2">
            <Calendar
              v-model="dateFilterRange"
              placeholder="Dates"
              selection-mode="range"
              :manual-input="false"
            />
          </div>
        </div>
      </template>
      <template #empty>
        <div class="text-center">
          <font-awesome-icon class="mr-1" :icon="faSquarePollVertical" />
          Aucun rapport disponible
        </div>
      </template>
      <Column field="name" header="Nom du rapport" :sortable="true" />
      <Column field="created_at" header="Date de création" :sortable="true" />
      <Column field="fileLink" header="Télécharger" header-style="width: 1rem">
        <template #body="slotProps">
          <a :href="slotProps.data.fileLink" target="_blank">
            <Button icon="pi pi-download" />
          </a>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
