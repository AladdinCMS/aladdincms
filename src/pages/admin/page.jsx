import React from 'react'
import { Link } from 'react-router-dom'

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 ">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {/* CMS Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Content Management</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          Manage and organize all your content
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <Link to="/admin/dashboard" className="font-medium text-green-600 hover:text-green-500">
                      Go to CMS Dashboard
                    </Link>
                  </div>
                </div>
              </div>

              {/* Other admin tools would go here */}
              {/* ... */}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminPage