import React, { useState } from 'react'

const TagEditorModal = ({ isOpen, onClose, document, onSave }) => {
  const [tags, setTags] = useState(document.tags || [])
  const [newTag, setNewTag] = useState('')

  if (!isOpen) return null

  const handleAddTag = () => {
    if (newTag.trim() !== '' && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleSave = () => {
    onSave({ ...document, tags })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Edit Tags</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600 mb-2">Document: {document.name}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.length > 0 ? (
              tags.map(tag => (
                <div key={tag} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <span className="text-sm text-gray-800">{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No tags added yet</p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="newTag" className="block text-sm font-medium text-gray-700 mb-1">
            Add New Tag
          </label>
          <div className="flex">
            <input
              type="text"
              id="newTag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border border-gray-300 rounded-l-md shadow-sm p-2"
              placeholder="Enter tag name"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700"
            >
              Add
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">Press Enter to add a tag</p>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default TagEditorModal