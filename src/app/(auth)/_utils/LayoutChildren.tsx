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
    <div className="flex min-h-screen flex-col bg-white text-black">
      <Nav onMenuClick={ () => setIsSidebarOpen(true) } />

      <div className="flex min-h-0 flex-1">
        <Sidebar isOpen={ isSidebarOpen } onClose={ () => setIsSidebarOpen(false) } />

        <main className="min-w-0 flex-1 px-6 py-4 lg:ml-75">
          { children }
        </main>
      </div>
    </div>
  )
}

export default LayoutChildren
