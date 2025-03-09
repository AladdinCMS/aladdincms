import React, { useState, useEffect } from "react";
import ContentUploader from "../../../components/cms/ContentUploader";
import TagEditorModal from "../../../components/cms/TagEditorModal";
import axios from "axios";

const DocumentsPage = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTagEditorOpen, setIsTagEditorOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch documents on component mount
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:3000/api/v1/documents");
        setDocuments(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching documents:", err);
        setError("Failed to load documents. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // All unique tags from documents
  const allTags = [...new Set(documents.flatMap((doc) => doc.tags || []))];

  // Filter documents based on search and selected tags
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      searchQuery === "" ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => doc.tags && doc.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  const handleTagClick = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const openTagEditor = (document) => {
    setCurrentDocument(document);
    setIsTagEditorOpen(true);
  };

  const handleSaveTags = async (updatedDocument) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/documents/${updatedDocument._id}/tags`, 
        { tags: updatedDocument.tags }
      );
      
      // Update document in state
      setDocuments(docs => 
        docs.map(doc => 
          doc._id === updatedDocument._id ? updatedDocument : doc
        )
      );
      
      setIsTagEditorOpen(false);
      setCurrentDocument(null);
    } catch (err) {
      console.error("Error updating document tags:", err);
      alert("Failed to update document tags. Please try again.");
    }
  };

  const handleDownload = (document) => {
    window.location.href = `http://localhost:3000/api/v1/documents/${document._id}/download`;
  };

  const handleDeleteDocument = async (documentId) => {
    if (window.confirm("Are you sure you want to delete this document? This action cannot be undone.")) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/documents/${documentId}`);
        setDocuments(docs => docs.filter(doc => doc._id !== documentId));
      } catch (err) {
        console.error("Error deleting document:", err);
        alert("Failed to delete document. Please try again.");
      }
    }
  };

  const getDocumentIcon = (type) => {
    switch (type) {
      case "pdf":
        return (
          <svg
            className="w-8 h-8 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "word":
        return (
          <svg
            className="w-8 h-8 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "excel":
        return (
          <svg
            className="w-8 h-8 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "image":
        return (
          <svg
            className="w-8 h-8 text-purple-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-8 h-8 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-500">Loading documents...</p>
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
        <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
        <p className="text-gray-600">Upload, organize, and search documents</p>
      </div>

      {/* Upload Section */}
      <div className="mb-8">
        <ContentUploader onUploadComplete={(newDoc) => setDocuments([...documents, newDoc])} />
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search documents..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-3 top-2.5">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex gap-2">
            <select className="border border-gray-300 rounded-lg px-3 py-2">
              <option>All File Types</option>
              <option>PDF</option>
              <option>Word</option>
              <option>Excel</option>
              <option>Images</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2">
              <option>Most Recent</option>
              <option>Oldest</option>
              <option>Name (A-Z)</option>
              <option>Size (Large to Small)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tags Section */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedTags.includes(tag)
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tags
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Size
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Uploaded
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => (
                <tr key={doc._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getDocumentIcon(doc.type)}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {doc.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          Uploaded by {doc.uploadedBy}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {(doc.tags || []).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(doc.uploadDate || doc.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-green-600 hover:text-green-900 mr-3"
                      onClick={() => handleDownload(doc)}
                    >
                      Download
                    </button>
                    <button
                      onClick={() => openTagEditor(doc)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit Tags
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteDocument(doc._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No documents found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Tag Editor Modal */}
      {currentDocument && (
        <TagEditorModal
          isOpen={isTagEditorOpen}
          onClose={() => setIsTagEditorOpen(false)}
          document={currentDocument}
          onSave={handleSaveTags}
        />
      )}
    </div>
  );
};

export default DocumentsPage;