<script setup lang="ts">
import error404Illustration from '~/common/assets/illustrations/error_404.svg'

const { t } = useI18n()

interface Props {
  title: string
  subtitle?: string
}

const props = defineProps<Props>()

</script>

<template>
  <div class="w-full h-full flex flex-col items-center gap-4">
    <img class="w-3/4 h-3/4" alt="error-500-illustration" :src="error404Illustration">
    <h2>{{ props.title || t('error.404.title') }}</h2>
    <Button class="p-button button" :label="t('error.404.back')" />
  </div>
</template>
