<script lang="ts" setup>
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

const props = defineProps<{
  label?: string
  icon?: IconDefinition
  to?: string
}>()
</script>

<template>
  <RouterLink class="sidebar-item" :to="props.to">
    <font-awesome-icon class="sidebar-item__icon" :icon="props.icon" />
    <span class="sidebar-item__label">{{ props.label }}</span>
  </RouterLink>
</template>

<style lang="scss">
.sidebar-item {
  @apply flex gap-4 py-4 px-8 items-center relative;

  &__icon {
    @apply mr-1 text-grey-dark;
  }

  &__label {
    @apply text-sm;
  }

  &.router-link-active, &:hover {
    @apply bg-secondary-light border-primary;

    &::before {
      @apply content-[''] absolute left-0 top-0 w-1 h-full block bg-primary;
    }

    .sidebar-item__icon {
      @apply text-primary;
    }

    .sidebar-item__label {
      @apply text-white;
    }
  }
}
</style>
