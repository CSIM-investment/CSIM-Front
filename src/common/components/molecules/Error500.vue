<script setup lang="ts">
import error500Illustration from '~/common/assets/illustrations/error_500.svg'

const { t } = useI18n()

function reload() {
  location.reload()
}
</script>

<template>
  <div class="w-full h-full flex flex-col  items-center">
    <img class="w-3/4 h-3/4" alt="error-500-illustration" :src="error500Illustration">
    <p>
      {{ t('error.500.title.part1') }}
      <u
        class="hover font-semibold cursor-pointer"
        @click="reload"
      >
        {{ t('error.500.title.part2') }}
      </u>
      {{ t('error.500.title.part3') }}
    </p>
  </div>
</template>
