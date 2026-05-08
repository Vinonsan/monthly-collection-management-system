'use client'

interface NavProps {
  onMenuClick?: () => void
}

const Nav = (props: NavProps) => {
  const { onMenuClick } = props

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white backdrop-blur">
      <div className="flex py-3 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open sidebar"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 text-gray-700 lg:hidden"
            onClick={ onMenuClick }
          >
            <span className="text-lg leading-none">=</span>
          </button>


        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-gray-950">Administrator</p>
            <p className="text-xs text-gray-500">Ward management</p>
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
