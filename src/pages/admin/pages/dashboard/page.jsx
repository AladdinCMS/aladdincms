import React, { useState, useEffect } from 'react';
import StatCard from '../../components/cms/StatCard';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDocuments: 0,
    totalUsers: 0,
    totalProgrammes: 0,
    totalNews: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentUpdates, setRecentUpdates] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch counts from all endpoints
        const [documentsRes, programmesRes, newsRes] = await Promise.all([
          axios.get('http://localhost:3000/api/v1/documents'),
          axios.get('http://localhost:3000/api/v1/programmes'),
          axios.get('http://localhost:3000/api/v1/news')
        ]);
        
        // Optional - you can also fetch volunteers if that endpoint is ready
        // const volunteersRes = await axios.get('http://localhost:3000/api/v1/volunteers');
        
        // Combine all data to create recent updates
        let allItems = [
          ...documentsRes.data.map(item => ({
            ...item,
            type: 'document',
            updateTime: new Date(item.updatedAt || item.createdAt)
          })),
          ...programmesRes.data.map(item => ({
            ...item,
            type: 'programme',
            updateTime: new Date(item.updatedAt || item.createdAt)
          })),
          ...newsRes.data.map(item => ({
            ...item,
            type: 'news',
            updateTime: new Date(item.updatedAt || item.createdAt)
          }))
        ];
        
        // Sort by update time (most recent first)
        allItems.sort((a, b) => b.updateTime - a.updateTime);
        
        // Take latest 5 items
        const latestUpdates = allItems.slice(0, 5).map(item => {
          const timeAgo = getTimeAgo(item.updateTime);
          let title, user;
          
          if (item.type === 'document') {
            title = item.name;
            user = item.uploadedBy;
          } else if (item.type === 'programme') {
            title = item.name;
            user = 'Admin';
          } else if (item.type === 'news') {
            title = item.title;
            user = 'Admin';
          }
          
          return {
            title,
            type: item.type,
            time: timeAgo,
            user
          };
        });
        
        setRecentUpdates(latestUpdates);
        
        // Set stats
        setStats({
          totalDocuments: documentsRes.data.length,
          totalProgrammes: programmesRes.data.length,
          totalNews: newsRes.data.length,
          // totalUsers: volunteersRes?.data?.length || 0
          totalUsers: 12 // Replace with actual data when volunteers endpoint is ready
        });
        
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  // Helper function to get relative time
  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval === 1 ? '1 year ago' : `${interval} years ago`;
    }
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval === 1 ? '1 month ago' : `${interval} months ago`;
    }
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval === 1 ? '1 day ago' : `${interval} days ago`;
    }
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
    }
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
    }
    
    return seconds < 10 ? 'just now' : `${seconds} seconds ago`;
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

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
          value={stats.totalDocuments.toString()} 
          icon={
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          } 
        />
        <StatCard 
          title="Total News Articles" 
          value={stats.totalNews.toString()} 
          icon={
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          } 
        />
        <StatCard 
          title="Team Members" 
          value={stats.totalUsers.toString()} 
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
                  {recentUpdates.slice(0, 3).map((update, index) => (
                    <li key={index} className="py-2">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          update.type === 'document' ? 'bg-purple-500' : 
                          update.type === 'programme' ? 'bg-green-500' : 'bg-blue-500'
                        }`}></div>
                        <span className="text-sm">{update.title}</span>
                      </div>
                    </li>
                  ))}
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
            {recentUpdates.map((update, index) => (
              <li key={index} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{update.title}</p>
                    <p className="text-sm text-gray-500">Updated by {update.user}</p>
                  </div>
                  <p className="text-sm text-gray-500">{update.time}</p>
                </div>
              </li>
            ))}
            {recentUpdates.length === 0 && (
              <li className="p-4 text-center text-gray-500">
                No recent updates found.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;