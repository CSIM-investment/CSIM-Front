<script setup lang="ts">
import { useNavigationStore } from '~/common/stores/navigation'
import type { NavItem } from '~/common/stores/navigation'

const props = defineProps<{
  navItems: NavItem[]
  class?: string
}>()

const { sidebarItems } = useNavigationStore()
const { t } = useI18n()
</script>

<template>
  <div
    class="flex-col"
    :class="props.class"
  >
    <SidebarItem
      v-for="item in props.navItems"
      :key="item.label"
      :label="t(item.label)"
      :icon="item.icon"
      :to="item.to"
    />
  </div>
</template>
