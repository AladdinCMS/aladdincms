import React, { useState } from 'react'
import ContentCard from '../../../components/cms/ContentCard'
import NewsEditor from '../../../components/cms/NewsEditor'

const NewsPage = () => {
  const [showEditor, setShowEditor] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  
  // Categories as specified
  const categories = [
    'Activities',
    'Awards',
    'Community',
    'DofE',
    'Environment',
    'Events',
    'Families',
    'Fundraising',
    'General',
    'Governance',
    'Home Education',
    'Impact',
    'News',
    'Recruitment',
    'Schools',
    'Training',
    'Volunteering'
  ]
  
  // Sample news data with updated categories
  const newsArticles = [
    { 
      id: 1, 
      title: 'Sustainability Initiative Launch', 
      type: 'news', 
      category: 'Environment',
      date: '2025-03-02',
      lastModified: 'Mar 2, 2025',
      content: 'The Green Team is proud to announce our new sustainability initiative aimed at reducing carbon footprint in our community. This program will focus on education and practical steps for individuals and businesses.' 
    },
    { 
      id: 3, 
      title: 'Earth Day Celebration', 
      type: 'news', 
      category: 'Events',
      date: '2025-02-28',
      lastModified: 'Feb 28, 2025',
      content: 'Join us for our annual Earth Day celebration with activities for all ages, environmental workshops, and local food vendors. The event will take place at City Park from 10am to 4pm.' 
    },
    { 
      id: 5, 
      title: 'New Green Space Project', 
      type: 'news', 
      category: 'Community',
      date: '2025-02-20',
      lastModified: 'Feb 20, 2025',
      content: 'We are excited to announce the development of a new green space in the downtown area. This project will transform an unused lot into a community garden and recreational area.' 
    },
    { 
      id: 6, 
      title: 'Volunteer Recognition Awards', 
      type: 'news', 
      category: 'Awards',
      date: '2025-02-15',
      lastModified: 'Feb 15, 2025',
      content: 'We are pleased to announce our annual Volunteer Recognition Awards ceremony taking place next month. Join us as we celebrate the dedicated individuals who have contributed to our mission.' 
    },
    { 
      id: 7, 
      title: 'Duke of Edinburgh Award Information Session', 
      type: 'news', 
      category: 'DofE',
      date: '2025-02-10',
      lastModified: 'Feb 10, 2025',
      content: 'Interested in the Duke of Edinburgh Award program? Attend our information session to learn about the requirements, benefits, and how to register for this prestigious youth development program.' 
    }
  ]

  // Filter articles based on selected category
  const filteredArticles = selectedCategory === 'All Categories' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory)

  const handleEditClick = (article) => {
    setEditingItem(article)
    setShowEditor(true)
  }

  const handleSave = (data) => {
    console.log('Saving news article:', data)
    // Here you would normally save to a database
    setShowEditor(false)
    setEditingItem(null)
  }
  
  const handleCancel = () => {
    setShowEditor(false)
    setEditingItem(null)
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">News Articles</h1>
        <p className="text-gray-600">Manage news and announcements</p>
      </div>

      {/* Action Buttons */}
      <div className="mb-6">
        <button
          onClick={() => {
            setEditingItem(null)
            setShowEditor(true)
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create New Article
        </button>
      </div>

      {/* Editor */}
      {showEditor && (
        <div className="mb-6">
          <NewsEditor 
            article={editingItem} 
            onSave={handleSave} 
            onCancel={handleCancel}
            categories={categories} 
          />
        </div>
      )}

      {/* Search and Filter */}
      {!showEditor && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64"
              />
              <div className="absolute left-3 top-2.5">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="flex gap-2">
              <select 
                className="border border-gray-300 rounded-lg px-3 py-2"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option>All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
              <select className="border border-gray-300 rounded-lg px-3 py-2">
                <option>Most Recent</option>
                <option>Oldest</option>
                <option>A-Z</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Content Grid */}
      {!showEditor && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((item) => (
              <div key={item.id} onClick={() => handleEditClick(item)} className="cursor-pointer">
                <ContentCard
                  title={item.title}
                  type={item.type}
                  lastModified={item.lastModified}
                  category={item.category}
                  details={item.content.substring(0, 100) + '...'}
                />
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8 text-gray-500">
              No articles found in this category.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default NewsPage