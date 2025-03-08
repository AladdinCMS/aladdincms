import React from 'react'

const ContentUploader = () => {
  const handleFileChange = (e) => {
    // For demo purposes, just log the selected file
    console.log(e.target.files[0])
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-medium mb-4">Upload New Content</h2>
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-green-500">
        <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-gray-600 mb-2">Drag and drop files here or click to browse</p>
        <input
          type="file"
          className="hidden"
          id="fileUpload"
          onChange={handleFileChange}
        />
        <label
          htmlFor="fileUpload"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer"
        >
          Select File
        </label>
      </div>
    </div>
  )
}

export default ContentUploader