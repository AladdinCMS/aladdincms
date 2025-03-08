import React from 'react'
import StatCard from '../../components/cms/StatCard'


const Dashboard = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to The Green Team Content Management System</p>
      </div>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard 
          title="Total Documents" 
          value="126" 
          icon={
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          } 
        />
        <StatCard 
          title="Marketing Materials" 
          value="47" 
          icon={
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          } 
        />
        <StatCard 
          title="Team Members" 
          value="12" 
          icon={
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          } 
        />
      </div>
      
      {/* Content Overview Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Content Overview</h2>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium">Recent Activity</h3>
              <p className="text-sm text-gray-500 mb-2">Latest content updates</p>
              <div className="w-full md:w-80">
                <ul className="divide-y divide-gray-200">
                  <li className="py-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm">New programme added: Summer Workshop</span>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm">News article updated: Earth Day</span>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      <span className="text-sm">Document uploaded: Sustainability Report</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Quick Actions</h3>
              <p className="text-sm text-gray-500 mb-2">Manage your content</p>
              <div className="flex flex-col space-y-2">
                <a href="/admin/content/news" className="text-sm px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Create News Article
                </a>
                <a href="/admin/content/programmes" className="text-sm px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Create Programme
                </a>
                <a href="/admin/content/documents" className="text-sm px-4 py-2 bg-purple-100 text-purple-800 rounded-md hover:bg-purple-200 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload Document
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Updates Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Updates</h2>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {[
              { title: 'Q1 Sustainability Report', time: '3 hours ago', user: 'Emma Lawson' },
              { title: 'Earth Day Campaign Assets', time: '1 day ago', user: 'Mark Chen' },
              { title: 'Community Garden Flyer', time: '2 days ago', user: 'Sophia Rodriguez' },
            ].map((item, index) => (
              <li key={index} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">Updated by {item.user}</p>
                  </div>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard