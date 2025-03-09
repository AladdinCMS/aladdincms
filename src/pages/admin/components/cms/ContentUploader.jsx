import React, { useState } from "react";
import axios from "axios";

const ContentUploader = (props) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
    setSuccess(false);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    try {
      setUploading(true);
      setError(null);
      const result = await handleFileUpload(file);
      setSuccess(true);
      setFile(null);
      // Reset the file input
      document.getElementById("fileUpload").value = "";
    } catch (error) {
      setError("Failed to upload file. Please try again.");
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", file.name);
      formData.append("type", getFileType(file.name));
      formData.append("uploadedBy", "Admin User"); // Replace with actual user
      
      const response = await axios.post(
        "http://localhost:3000/api/v1/documents",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      // Call the callback if provided
      if (props.onUploadComplete) {
        props.onUploadComplete(response.data.document);
      }
      
      return response.data.document;
    } catch (error) {
      console.error("Error uploading document:", error);
      throw error;
    }
  };
  
  // Helper function to determine file type
  const getFileType = (filename) => {
    const extension = filename.split(".").pop().toLowerCase();
    if (["pdf"].includes(extension)) return "pdf";
    if (["doc", "docx"].includes(extension)) return "word";
    if (["xls", "xlsx", "csv"].includes(extension)) return "excel";
    if (["jpg", "jpeg", "png", "gif", "svg"].includes(extension))
      return "image";
    return "other";
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-medium mb-4">Upload New Content</h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          File uploaded successfully!
        </div>
      )}
      
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-green-500">
        <svg
          className="w-10 h-10 text-gray-400 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="text-gray-600 mb-2">
          Drag and drop files here or click to browse
        </p>
        
        {file && (
          <p className="text-sm text-gray-500 mb-2">
            Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </p>
        )}
        
        <input
          type="file"
          className="hidden"
          id="fileUpload"
          onChange={handleFileChange}
        />
        <div className="flex space-x-2">
          <label
            htmlFor="fileUpload"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer"
          >
            Select File
          </label>
          
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ${
              !file || uploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentUploader;