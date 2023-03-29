<script lang="ts" setup>
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigationStore } from '~/common/stores/navigation'
import { useSessionStore } from '~/authentication/stores/session'

const { t } = useI18n()
const {
  headerItems,
  mobileSidebarItems,
  isSidebarOpen,
} = useNavigationStore()

const { user } = useSessionStore()
</script>

<template>
  <div class="fixed bg-white z-50 top-0 h-header w-full flex justify-between">
    <RouterLink to="/" class="flex justify-center p-2 md:ml-8">
      <img src="/src/common/assets/images/CSIM.svg" alt="csim-logo">
    </RouterLink>
    <div class="flex justify-center items-center p-2 md:mr-8">
      <div class="hidden md:flex mr-8">
        <RouterLink v-for="item in headerItems" :key="item.label" class="py-4 px-6 hover:text-secondary hover:font-medium" :to="item.to">
          {{ item.label }}
        </RouterLink>
      </div>
      <template v-if="user">
        <RouterLink class="flex" to="/profile">
          <div class="flex flex-col text-xs">
            <small class="hidden md:block">{{ t('header.welcome') }}</small>
            <span class="text-xs font-bold">{{ user.firstName }} {{ user.lastName }}</span>
          </div>
          <div class="ml-2">
            <img src="/src/common/assets/images/user.png" alt="user-photo">
          </div>
        </RouterLink>
      </template>
      <template v-else>
        <RouterLink class="text-md hover:text-secondary hover:font-medium" to="login">
          {{ t('header.login') }}
        </RouterLink>
      </template>
      <div class="mx-4 md:hidden">
        <font-awesome-icon :icon="faBars" @click="isSidebarOpen = true" />
      </div>
    </div>

    <Sidebar v-model:visible="isSidebarOpen">
      <template #header>
        <CsimLogo class="h-12 w-full mr-auto" />
      </template>
      <AppSidebar :nav-items="mobileSidebarItems" />
    </Sidebar>
  </div>
</template>
