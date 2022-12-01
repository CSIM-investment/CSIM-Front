<script setup lang="ts">
import authIllustration from '~/common/assets/illustrations/auth_illustration.svg'

const { t } = useI18n()

const props = defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <div class="flex h-full">
    <section class="bg-primary flex flex-col flex-1 items-center justify-center gap-2 p-8">
      <img :src="authIllustration" alt="" class="w-full max-w-2xl">
      <p class="text-white text-2xl text-center">
        {{ t('auth.description') }}
      </p>
    </section>
    <section class="flex-1 px-28 flex items-center justify-center">
      <div class="flex flex-col items-center justify-center w-3/4 text-center">
        <CsimLogo />
        <h1 class="text-5xl font-bold pt-4 pb-2">
          {{ props.title }}
        </h1>
        <h2 class="text-3xl text-grey-dark font-semibold pb-12">
          {{ props.subtitle }}
        </h2>
        <slot />
      </div>
    </section>
  </div>
</template>

<style lang="scss"></style>
