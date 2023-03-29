<script lang="ts" setup>
import Settings from '~/profile/components/organisms/Settings.vue'
const { t } = useI18n()
</script>

<template>
  <div class="mx-8">
    <div class="mb-10">
      <h1 class="font-bold text-4xl">
        {{ t("profile.title") }}
      </h1>
      <span>{{ t("profile.subtitle") }}</span>
    </div>
    <div>
      <Settings />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
