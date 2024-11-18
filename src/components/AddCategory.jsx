import React, { useState } from 'react';
import { Camera } from 'lucide-react';

function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('category_name', categoryName);
    formData.append('category_image', categoryImage);

    try {
      const response = await fetch("https://bookmycater.freewebhostmost.com/submitCategory.php", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting the form: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Category</h2>

      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <div className="mb-6">
          <label
            htmlFor="category_name"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Category Name
          </label>
          <input
            type="text"
            id="category_name"
            name="category_name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            placeholder="Enter category name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="category_image"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Category Image
          </label>
          <div
            className="relative border border-dashed border-gray-300 rounded-lg w-full h-36 flex justify-center items-center cursor-pointer hover:border-blue-500 transition-colors"
          >
            <input
              type="file"
              id="category_image"
              name="category_image"
              accept="image/*"
              onChange={(e) => setCategoryImage(e.target.files[0])}
              required
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center text-gray-500">
              <Camera className="w-8 h-8 mb-2" />
              <span className="text-sm">
                {categoryImage ? categoryImage.name : 'Click to upload image'}
              </span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Category
        </button>
      </form>
    </div>
  );
}

export default AddCategory;
