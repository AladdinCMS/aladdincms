import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/cms/Header'
import Sidebar from './components/cms/Sidebar'

const CmsLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default CmsLayout