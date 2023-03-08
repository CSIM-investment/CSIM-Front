<script lang="ts" setup>
const { t } = useI18n()
</script>

<template>
  <div class="mb-10 mx-8">
    <div class="mb-10">
      <h1 class="font-bold text-4xl">
        {{ t("investments.reports.title") }}
      </h1>
      <span>{{ t("investments.reports.description") }}</span>
    </div>
    <div>
      <ReportsList />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
