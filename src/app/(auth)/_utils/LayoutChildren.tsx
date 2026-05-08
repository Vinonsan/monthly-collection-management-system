'use client'

import { ReactNode, useState } from 'react'
import Nav from './components/Nav'
import Sidebar from './components/Sidebar'

interface LayoutChildrenProps {
  children: ReactNode
}

const LayoutChildren = (props: LayoutChildrenProps) => {
  const { children } = props
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-white text-black">
      <Sidebar isOpen={ isSidebarOpen } onClose={ () => setIsSidebarOpen(false) } />

      <div className="flex min-w-0 flex-1 flex-col">
        <Nav onMenuClick={ () => setIsSidebarOpen(true) } />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          { children }
        </main>
      </div>
    </div>
  )
}

export default LayoutChildren
