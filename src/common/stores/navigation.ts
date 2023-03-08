import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowRightArrowLeft,
  faChartPie,
  faCog,
  faLightbulb,
  faMoneyBillTrendUp, faNewspaper,
  faTicket,
  faUsers,
  faWallet,
} from '@fortawesome/free-solid-svg-icons'
import { useSessionStore } from '~/authentication/stores/session'

export interface NavItem {
  label: string
  to: string
  icon?: IconDefinition
}

export const useNavigationStore = createGlobalState(() => {
  const { user } = useSessionStore()
  const { t } = useI18n()

  const headerItems: NavItem[] = [
    {
      label: t('header.market'),
      to: '/market',
      icon: faMoneyBillTrendUp,
    },
    {
      label: t('header.exchange'),
      to: '/exchange',
      icon: faArrowRightArrowLeft,
    },
    {
      label: t('header.news'),
      to: '/news',
      icon: faNewspaper,
    },
  ]

  const sidebarItems: NavItem[] = [
    {
      label: t('sidebar.dashboard'),
      icon: faChartPie,
      to: '/dashboard',
    },
    {
      label: t('sidebar.favorites'),
      icon: faTicket,
      to: '/favorites',
    },
    {
      label: t('sidebar.investments'),
      icon: faLightbulb,
      to: '/investments',
    },
    {
      label: t('sidebar.reports'),
      icon: faUsers,
      to: '/reports',
    },
    {
      label: t('sidebar.wallet'),
      icon: faWallet,
      to: '/wallet',
    },
    {
      label: t('sidebar.settings'),
      icon: faCog,
      to: '/settings',
    },
  ]

  const isSidebarOpen = ref(false)

  const mobileSidebarItems = computed(() => {
    if (!user.value)
      return headerItems

    return [...headerItems, ...sidebarItems]
  })

  return {
    sidebarItems,
    mobileSidebarItems,
    headerItems,
    isSidebarOpen,
  }
})
