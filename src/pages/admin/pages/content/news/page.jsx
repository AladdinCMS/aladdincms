import React, { useState, useEffect } from 'react'
import ContentCard from '../../../components/cms/ContentCard'
import NewsEditor from '../../../components/cms/NewsEditor'
import axios from 'axios'

const NewsPage = () => {
  const [showEditor, setShowEditor] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [articleToDelete, setArticleToDelete] = useState(null)
  const [newsArticles, setNewsArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
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
  
  // Fetch news articles on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('http://localhost:3000/api/v1/news')
        setNewsArticles(response.data)
        setError(null)
      } catch (err) {
        console.error('Error fetching news articles:', err)
        setError('Failed to load news articles. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchNews()
  }, [])

  // Filter articles based on selected category
  const filteredArticles = selectedCategory === 'All Categories' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory)

  const handleEditClick = (article) => {
    setEditingItem(article)
    setShowEditor(true)
  }

  const handleDeleteClick = (article) => {
    setArticleToDelete(article)
    setShowDeleteConfirmation(true)
  }

  const confirmDelete = async () => {
    if (articleToDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/news/${articleToDelete._id}`)
        setNewsArticles(prev => prev.filter(article => article._id !== articleToDelete._id))
        setShowDeleteConfirmation(false)
        setArticleToDelete(null)
      } catch (err) {
        console.error('Error deleting news article:', err)
        alert('Failed to delete news article. Please try again.')
      }
    }
  }

  const cancelDelete = () => {
    setShowDeleteConfirmation(false)
    setArticleToDelete(null)
  }

  const handleSave = async (data) => {
    try {
      if (data._id) {
        // Update existing article
        const response = await axios.put(`http://localhost:3000/api/v1/news/${data._id}`, data)
        setNewsArticles(prev => prev.map(article => 
          article._id === data._id ? response.data.news : article
        ));
      } else {
        // Create new article
        const response = await axios.post('http://localhost:3000/api/v1/news', data)
        setNewsArticles(prev => [...prev, response.data.news]);
      }
      
      setShowEditor(false)
      setEditingItem(null)
    } catch (err) {
      console.error('Error saving news article:', err)
      alert('Failed to save news article. Please try again.')
    }
  }
  
  const handleCancel = () => {
    setShowEditor(false)
    setEditingItem(null)
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-500">Loading news articles...</p>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    )
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
              <div key={item._id}>
                <ContentCard
                  title={item.title}
                  type="news"
                  lastModified={new Date(item.updatedAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                  category={item.category}
                  details={item.content.substring(0, 100) + '...'}
                  image={item.image}
                  onEdit={() => handleEditClick(item)}
                  onDelete={() => handleDeleteClick(item)}
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Article</h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete "{articleToDelete?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewsPage