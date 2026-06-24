'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import SVG, { type IconType } from '@/src/components/Svg'
import { removeToken } from '@/src/lib/auth'
import { useAppDispatch } from '@/src/lib/redux/hooks'
import { clearAuthState } from '@/src/lib/redux/slices/auth'

interface SidebarItem {
  id: string
  label: string
  href?: string
  icon?: IconType
  children?: SidebarItem[]
}

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/',
    icon: 'dashboard'
  },
  {
    id: 'collections',
    label: 'Collections',
    icon: 'wallet',
    children: [
      { id: 'monthly', label: 'Monthly Collections', href: '/collections/collection-dashboard' },
      { id: 'payments', label: 'Payments', href: '/collections/payments' }
    ]
  },
  {
    id: 'users',
    label: 'User Management',
    icon: 'users',
    children: [
      { id: 'users', label: 'Users', href: '/user-management/users' },
      { id: 'collectors', label: 'Collectors', href: '/user-management/collectors' }
    ]
  },
  {
    id: 'locations',
    label: 'Location Management',
    icon: 'map',
    children: [
      { id: 'locations', label: 'Locations', href: '/location-management/locations' },
      { id: 'wards', label: 'Wards', href: '/location-management/wards' }
    ]
  }
]

const isActivePath = (item: SidebarItem, pathname: string): boolean => {
  if (item.href && (pathname === item.href || pathname.startsWith(`${item.href}/`))) {
    return true
  }

  return item.children?.some((child) => isActivePath(child, pathname)) ?? false
}

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const activeParentIds = sidebarItems
    .filter((item) => isActivePath(item, pathname))
    .map((item) => item.id)
  const activeParentId = activeParentIds[0] || null

  const [openMenu, setOpenMenu] = useState<{ pathname: string; id: string | null }>({
    pathname,
    id: activeParentId
  })
  const openMenuId = openMenu.pathname === pathname ? openMenu.id : activeParentId

  const toggleMenu = (id: string) => {
    setOpenMenu((current) => ({
      pathname,
      id: current.pathname === pathname && current.id === id ? null : id
    }))
  }

  const handleDirectLinkClick = () => {
    setOpenMenu({ pathname, id: null })
    onClose?.()
  }

  const handleLogout = () => {
    removeToken()
    dispatch(clearAuthState())
    router.push('/login')
  }

  const renderIcon = (icon: IconType | undefined, active: boolean) => {
    if (!icon) return null

    return (
      <span
        className={ [
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors',
          active ? 'bg-white/15 text-white' : 'bg-theme-primary/10 text-theme-primary'
        ].join(' ') }
      >
        <SVG type={ icon } width={ 17 } height={ 17 } />
      </span>
    )
  }

  const renderMenuItem = (item: SidebarItem) => {
    const hasChildren = Boolean(item.children?.length)
    const active = isActivePath(item, pathname)
    const expanded = openMenuId === item.id

    if (hasChildren) {
      return (
        <li key={ item.id }>
          <button
            type="button"
            onClick={ () => toggleMenu(item.id) }
            className={ [
              'group flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300',
              active
                ? 'bg-theme-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-theme-primary/5 hover:text-theme-primary'
            ].join(' ') }
          >
            <span className="flex min-w-0 items-center gap-3">
              { renderIcon(item.icon, active) }
              <span className="truncate">{ item.label }</span>
            </span>

            <SVG
              type="chevron-down"
              width={ 14 }
              height={ 14 }
              className={ [
                'shrink-0 transition-transform duration-300',
                expanded ? 'rotate-180' : ''
              ].join(' ') }
            />
          </button>

          <div
            className={ [
              'grid transition-all duration-300',
              expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            ].join(' ') }
          >
            <ul className="ml-6 mt-2 space-y-1 overflow-hidden border-l border-theme-primary/15 pl-4">
              { item.children?.map((child) => {
                const childActive = isActivePath(child, pathname)

                return (
                  <li key={ child.id }>
                    <Link
                      href={ child.href || '#' }
                      onClick={ onClose }
                      className={ [
                        'flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all duration-300',
                        childActive
                          ? 'bg-theme-primary/10 text-theme-primary'
                          : 'text-slate-500 hover:bg-theme-primary/5 hover:text-theme-primary'
                      ].join(' ') }
                    >
                      <span
                        className={ [
                          'h-1.5 w-1.5 rounded-full',
                          childActive ? 'bg-theme-primary' : 'bg-slate-300'
                        ].join(' ') }
                      />
                      { child.label }
                    </Link>
                  </li>
                )
              }) }
            </ul>
          </div>
        </li>
      )
    }

    return (
      <li key={ item.id }>
        <Link
          href={ item.href || '#' }
          onClick={ handleDirectLinkClick }
          className={ [
            'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300',
            active
              ? 'bg-theme-primary text-white shadow-sm'
              : 'text-slate-600 hover:bg-theme-primary/5 hover:text-theme-primary'
          ].join(' ') }
        >
          { renderIcon(item.icon, active) }
          <span className="truncate">{ item.label }</span>
        </Link>
      </li>
    )
  }

  return (
    <>
      { isOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={ onClose }
          className="fixed bottom-0 left-0 right-0 top-16.25 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      ) }

      <aside
        className={ [
          'fixed bottom-0 left-0 top-16.25 z-50 w-75 transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        ].join(' ') }
      >
        <div className="flex h-full flex-col border-r border-slate-200 bg-white px-4 py-2 text-slate-950 shadow-2xl">
          <div className="mb-6 rounded-md bg-theme-primary/10 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-theme-primary">
              Main Menu
            </p>
            <h2 className="mt-1 text-lg font-bold text-slate-950">Management</h2>
          </div>

          <nav className="sidebar flex-1 overflow-y-auto pr-1 no-scrollbar ">
            <ul className="space-y-2">
              { sidebarItems.map(renderMenuItem) }
            </ul>
          </nav>

          <div className="mt-5 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={ handleLogout }
              className="flex w-full items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition-all duration-300 hover:border-theme-primary/20 hover:bg-theme-primary/5 hover:text-theme-primary"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
