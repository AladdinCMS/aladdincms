import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import axios from "axios";

const NewsEditor = ({ article, onSave, onCancel, categories = [] }) => {
  const [formData, setFormData] = useState(
    article || {
      title: "",
      date: new Date().toISOString().split("T")[0],
      category: "",
      content: "",
      image: null,
    }
  );

  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  // Initialize image preview if article has an image
  useEffect(() => {
    if (article && article.image) {
      setImagePreview(article.image);
    }
  }, [article]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setImageUploading(true);

      const formData = new FormData();
      formData.append("image", file);

      // If editing existing article, add the formData to your state
      // This is just to preview the image, actual upload happens on save
      setFormData((prevData) => ({
        ...prevData,
        imageFile: file,
        image: URL.createObjectURL(file),
      }));

      setImageUploading(false);
    } catch (error) {
      console.error("Error handling image:", error);
      setImageUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      setImagePreview(imageUrl);
      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
        imageFile: file // Make sure to store the file object for upload
      }));
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({
      ...prev,
      image: null,
      imageFile: null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = new FormData();

      // Add all form fields
      submitData.append("title", formData.title);
      submitData.append("category", formData.category);
      submitData.append("content", formData.content);
      submitData.append("date", formData.date);

      // Add image if we have a new one
      if (formData.imageFile) {
        submitData.append("image", formData.imageFile);
      }

      let result;
      
      if (article?._id) {
        // Update existing article
        result = await axios.put(
          `http://localhost:3000/api/v1/news/${article._id}`,
          submitData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Create new article
        result = await axios.post(
          "http://localhost:3000/api/v1/news", 
          submitData, 
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      // Pass the result back to the parent component
      if (onSave) {
        onSave(result.data.news || formData);
      }
    } catch (err) {
      console.error("Error saving news article:", err);
      alert("Failed to save news article. Please try again.");
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">
        {article ? "Edit" : "Create"} News Article
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
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
                <option key={index} value={category}>
                  {category}
                </option>
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
          <label
            htmlFor="featuredImage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Featured Image
          </label>
          <div className="mt-1 flex items-center">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Featured"
                  className="h-40 w-auto object-cover rounded-md border border-gray-300"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <label
                  htmlFor="featuredImage"
                  className="cursor-pointer flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Image
                </label>
                <input
                  type="file"
                  id="featuredImage"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Recommended size: 1200x630 pixels
          </p>
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
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
  );
};

export default NewsEditor;