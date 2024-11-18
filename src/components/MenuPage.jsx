import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MenuPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://bookmycater.freewebhostmost.com/getCategories.php");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Assuming the backend returns an array of category objects
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
        Discover Our Categories
      </h1>

      {/* Category grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.id}
              className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-md cursor-pointer transition-shadow"
              onClick={() => navigate(`/category/${category.id}`)} // Navigate to category-specific page
            >
              <img
                src={`https://bookmycater.freewebhostmost.com/${category.img_location}`} // Construct image URL
                alt={category.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
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
