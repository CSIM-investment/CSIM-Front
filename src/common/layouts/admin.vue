<script setup>
import { useNavigationStore } from '~/common/stores/navigation'

const { sidebarItems } = useNavigationStore()
</script>

<template>
  <div class="app">
    <Header />
    <div class="app__container">
      <AppSidebar class="app__sidebar" :nav-items="sidebarItems" />
      <div class="app__page">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {
  height: 100%;

  &__container {
    display: grid;
    height: 100%;

    @screen md {
      grid-template-columns: minmax(12rem, 15%) auto;
    }
  }

  &__sidebar {
    height: 100%;
    display: none;

    @screen md {
      display: flex;
    }
  }

  &__page {
    height: calc(100vh - 64px);
    overflow-y: auto;
    @apply scroll-auto px-4 py-2 md:px-16 md:py-4 bg-grey-lighter;
  }
}
</style>
