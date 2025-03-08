import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { 
          name: 'Content', 
          icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
          children: [
            { name: 'News Articles', href: '/admin/content/news' },
            { name: 'Programmes', href: '/admin/content/programmes' },
            { name: 'Documents', href: '/admin/content/documents' }
          ]
        },
        { name: 'Volunteers', href: '/admin/volunteers', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
        { name: 'Donations', href: '/admin/donations', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' }
      ]

  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="p-4">
        <nav className="space-y-2">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.href ? (
                <Link
                  to={item.href}
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-green-50 hover:text-green-700"
                >
                  <svg
                    className="text-gray-500 mr-3 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  {item.name}
                </Link>
              ) : (
                <div>
                  <div className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600">
                    <svg
                      className="text-gray-500 mr-3 h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    {item.name}
                  </div>
                  
                  {item.children && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-green-50 hover:text-green-700"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar