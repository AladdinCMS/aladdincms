import React from 'react'

const ContentCard = ({ title, type, lastModified, category, details }) => {
  // Enhanced icon mapping for content types
  const getIcon = () => {
    switch (type) {
      case 'news':
        return (
          <svg className="h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-1M9 15h2m-2 4h6m-6-4h6m-6-4h6m6 0v6m-6 0a2 2 0 002 2h2a2 2 0 002-2m-4-6v6" />
          </svg>
        )
      case 'programme':
        return (
          <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      default:
        return (
          <svg className="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        {getIcon()}
        <div className="ml-3">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          {category && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">{category}</span>}
          <p className="text-sm text-gray-500">Last modified: {lastModified}</p>
        </div>
      </div>
      
      {details && (
        <div className="mt-2 text-sm text-gray-600">
          <p className="truncate">{details}</p>
        </div>
      )}
      
      <div className="mt-4 flex space-x-2">
        <button className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200">
          Edit
        </button>
        <button className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200">
          Share
        </button>
      </div>
    </div>
  )
}

export default ContentCard