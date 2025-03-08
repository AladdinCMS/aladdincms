import React, { useState } from 'react'

const NewsEditor = ({ article, onSave, onCancel, categories = [] }) => {
  const [formData, setFormData] = useState(article || {
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    content: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">{article ? 'Edit' : 'Create'} News Article</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          >
            <option value="">Select a category</option>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))
            ) : (
              <>
                <option value="Activities">Activities</option>
                <option value="Awards">Awards</option>
                <option value="Community">Community</option>
                <option value="DofE">DofE</option>
                <option value="Environment">Environment</option>
                <option value="Events">Events</option>
                <option value="Families">Families</option>
                <option value="Fundraising">Fundraising</option>
                <option value="General">General</option>
                <option value="Governance">Governance</option>
                <option value="Home Education">Home Education</option>
                <option value="Impact">Impact</option>
                <option value="News">News</option>
                <option value="Recruitment">Recruitment</option>
                <option value="Schools">Schools</option>
                <option value="Training">Training</option>
                <option value="Volunteering">Volunteering</option>
              </>
            )}
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={8}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            Save Article
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewsEditor