import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MenuPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://bookmycater.freewebhostmost.com/getCategory.php");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Backend should return a JSON array
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-white py-10 px-5">
      <h1 className="text-3xl font-bold text-green-600 text-center mb-8">
        Browse Categories
      </h1>

      {/* Display category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.id}
              className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/category/${category.id}`)} // Example: navigate to a category-specific page
            >
              <img
                src={category.image_url} // Load image from backend
                alt={category.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-700 text-center">
                {category.name}
              </h2>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No categories available.
          </p>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
