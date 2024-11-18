import React, { useState } from 'react';
import { Upload, X } from 'lucide-react'; // Assuming you're using Feather icons

const AddCategory = () => {
  const [formData, setFormData] = useState({ categoryName: '', categoryImage: null });
  const [previewURL, setPreviewURL] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, categoryImage: file }));
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setFormData(prev => ({ ...prev, categoryImage: null }));
    setPreviewURL(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formDataWithFiles = new FormData();
    formDataWithFiles.append('categoryName', formData.categoryName);
    if (formData.categoryImage) {
      formDataWithFiles.append('categoryImage', formData.categoryImage);
    }

    try {
      const response = await fetch("http://bookmycater.freewebhostmost.com/submitCategory.php", {
        method: "POST",
        body: formDataWithFiles,
      });

      const result = await response.text();
      if (response.ok) {
        alert('Category added successfully!');
      } else {
        alert(result);
      }
    } catch (error) {
      alert('Error submitting the form: ' + error.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-16 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Add New Category
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={formData.categoryName}
                onChange={(e) => setFormData(prev => ({ ...prev, categoryName: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter category name"
                required
              />
            </div>

            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Image
              </label>
              <div className="mt-2">
                {!previewURL ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="h-12 w-12 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500">
                        Click to upload image
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={previewURL}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Adding Category...' : 'Add Category'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
