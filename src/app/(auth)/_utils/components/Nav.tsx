'use client'

import SVG from '@/src/components/Svg'

interface NavProps {
  onMenuClick?: () => void
}

const Nav = (props: NavProps) => {
  const { onMenuClick } = props

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open sidebar"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 text-gray-700 lg:hidden"
            onClick={ onMenuClick }
          >
            <span className="text-lg leading-none">=</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-theme-primary/10 text-theme-primary">
              <SVG type="wallet" width={ 20 } height={ 20 } />
            </span>
            <div>
              <p className="text-base font-semibold text-slate-950">Money Management System</p>
              <p className="text-xs text-slate-500">Monthly collections</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-slate-950">Administrator</p>
            <p className="text-xs text-slate-500">Admin profile</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-theme-primary text-sm font-semibold text-white">
            A
          </div>
        </div>
      </div>
    </header>
  )
}

export default Nav
