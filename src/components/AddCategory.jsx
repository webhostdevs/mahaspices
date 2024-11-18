import React, { useState } from "react";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send category name and image
    const formData = new FormData();
    formData.append("category_name", categoryName);
    formData.append("category_image", categoryImage);

    try {
      const response = await fetch(
        "http://bookmycater.freewebhostmost.com/submitCategory.php", {
          method: "POST",
          body: formData,
        }
      );

      // Check if the response is OK
      if (response.ok) {
        alert("Category added successfully!");
        setCategoryName("");  // Reset form fields
        setCategoryImage(null);
      } else {
        alert("Error adding category.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add Category</h2>
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="category_name" className="block text-gray-700 font-semibold">
              Category Name
            </label>
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
            <label htmlFor="category_image" className="block text-gray-700 font-semibold">
              Category Image
            </label>
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

          <button
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Submit Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
