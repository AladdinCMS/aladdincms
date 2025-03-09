import React, { useState } from 'react'
import { href, Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState(['Content']); // Pre-expand Content by default
  
  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/admin/dashboard', 
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' 
    },
    {
      name: 'Content',
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      children: [
        { name: 'News Articles', href: '/admin/content/news' },
        { name: 'Programmes', href: '/admin/content/programmes' },
        { name: 'Documents', href: '/admin/content/documents' }
      ]
    },
    { 
      name: 'Users', 
      href: '/admin/users', 
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' 
    },
    {
      name: 'Team',
      href: '/admin/team',
      icon: 'M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z'
    },
    { 
      name: 'Donations', 
      href: '/admin/donations', 
      icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' 
    }
  ];

  // Check if a route is active (exactly matches the current path)
  const isActive = (href) => location.pathname === href;
  
  // Check if a parent item should be highlighted (any child route is active)
  const isParentActive = (item) => {
    if (item.href && isActive(item.href)) return true;
    if (item.children) {
      return item.children.some(child => isActive(child.href));
    }
    return false;
  };

  // Toggle expand/collapse for items with children
  const toggleExpand = (name) => {
    setExpandedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name) 
        : [...prev, name]
    );
  };

  // Check if an item is expanded
  const isExpanded = (name) => expandedItems.includes(name);

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-4 flex flex-col h-full">
        <div className="flex-shrink-0 mb-6">
          <h2 className="text-2xl font-bold text-green-700">Admin Panel</h2>
        </div>
        
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const active = isParentActive(item);
            
            return (
              <div key={item.name} className="mb-1">
                {item.href ? (
                  // Regular menu item with direct link
                  <Link
                    to={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md 
                      ${active 
                        ? 'bg-green-100 text-green-700' 
                        : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}
                  >
                    <svg
                      className={`mr-3 h-6 w-6 ${active ? 'text-green-600' : 'text-gray-500'}`}
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
                  // Menu item with children (expandable)
                  <div>
                    <button
                      onClick={() => toggleExpand(item.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md 
                        ${active 
                          ? 'bg-green-100 text-green-700' 
                          : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}
                    >
                      <div className="flex items-center">
                        <svg
                          className={`mr-3 h-6 w-6 ${active ? 'text-green-600' : 'text-gray-500'}`}
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
                      {/* Chevron icon */}
                      <svg 
                        className={`ml-auto h-5 w-5 transform transition-transform duration-200 ${isExpanded(item.name) ? 'rotate-90' : ''}`} 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {/* Children submenu with transition */}
                    {item.children && isExpanded(item.name) && (
                      <div className="ml-8 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md
                              ${isActive(child.href)
                                ? 'bg-green-100 text-green-700' 
                                : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        
        <div className="flex-shrink-0 pt-4 mt-auto border-t border-gray-200">
          <div className="flex items-center px-3 py-2">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Admin User</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar