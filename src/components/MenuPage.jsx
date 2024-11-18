import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // Replace with your actual API URL
      const response = await fetch('https://bookmycater.freewebhostmost.com/getCategory.php');
      const data = await response.json();
      
      if (data.status === "success") {
        setCategories(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryName) => {
    // Convert category name to URL-friendly format
    const urlFriendlyName = categoryName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    navigate(`/category/${urlFriendlyName}`);
  };

  // Function to get correct image URL
  const getImageUrl = (imageUrl) => {
    // If the image URL is relative, construct the full URL
    if (imageUrl && !imageUrl.startsWith('http')) {
      return `ttps://bookmycater.freewebhostmost.com/${imageUrl}`;
    }
    return imageUrl;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl">{error}</p>
          <button 
            onClick={fetchCategories}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-10 px-5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Menu Categories
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.category_id}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => handleCategoryClick(category.category_name)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getImageUrl(category.image_url)}
                  alt={category.category_name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = '/placeholder.jpg'; // Your placeholder image
                    e.target.alt = 'Category image not found';
                    e.target.className = 'w-full h-full object-contain p-4';
                  }}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.category_name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                    View Items
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transform group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center text-gray-500 mt-8 p-8 bg-gray-50 rounded-lg">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01"
              />
            </svg>
            <p className="text-xl">No categories available</p>
            <p className="text-sm mt-2">Please check back later</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
