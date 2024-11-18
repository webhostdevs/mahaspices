import React, { useState } from 'react';

function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Form data with files
    const formData = new FormData();
    formData.append('category_name', categoryName);
    formData.append('category_image', categoryImage);

    // Send form data to the backend using fetch
    try {
  const response = await fetch("https://bookmycater.freewebhostmost.com/submitCategory.php", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.text();
  alert(result);  // Show server response

} catch (error) {
  console.error("Error:", error);
  alert("Error submitting the form: " + error.message);
}

  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add Category</h2>

      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="category_name" className="block text-gray-700 font-medium">Category Name</label>
          <input
            type="text"
            id="category_name"
            name="category_name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category_image" className="block text-gray-700 font-medium">Category Image</label>
          <input
            type="file"
            id="category_image"
            name="category_image"
            accept="image/*"
            onChange={(e) => setCategoryImage(e.target.files[0])}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Add Category
        </button>
      </form>
    </div>
  );
}

export default AddCategory;
