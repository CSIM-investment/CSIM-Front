<script setup lang="ts">
import logoPrimary from '~/common/assets/logos/logo_primary.svg'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <img :src="logoPrimary" alt="CSIM primary logo" :class="props.class">
</template>
