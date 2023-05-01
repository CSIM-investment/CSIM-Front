import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowRightArrowLeft,
  faChartPie,
  faCog,
  faLightbulb,
  faMoneyBillTrendUp, faNewspaper,
  faTicket, faUser,
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

  const headerItems: NavItem[] = [
    {
      label: 'header.market',
      to: '/market',
      icon: faMoneyBillTrendUp,
    },
    {
      label: 'header.dashboard',
      to: '/dashboard',
      icon: faChartPie,
    },
    {
      label: 'header.news',
      to: '/news',
      icon: faNewspaper,
    },
  ]

  const sidebarItems: NavItem[] = [
    {
      label: 'sidebar.profile',
      icon: faUser,
      to: '/profile',
    },
    {
      label: 'sidebar.dashboard',
      icon: faChartPie,
      to: '/dashboard',
    },
    {
      label: 'sidebar.favorites',
      icon: faTicket,
      to: '/favorites',
    },
    {
      label: 'sidebar.investments',
      icon: faLightbulb,
      to: '/investments',
    },
    {
      label: 'sidebar.reports',
      icon: faUsers,
      to: '/reports',
    },
    {
      label: 'sidebar.wallet',
      icon: faWallet,
      to: '/wallet',
    },
    {
      label: 'sidebar.settings',
      icon: faCog,
      to: '/settings',
    },
  ]

  const isSidebarOpen = ref(false)

  const mobileSidebarItems = computed<NavItem[]>(() => {
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
