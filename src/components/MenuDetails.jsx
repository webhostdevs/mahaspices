import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MenuDetails = () => {
  const { category_name } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, [category_name]);

  const fetchMenuItems = async () => {
    try {
      
      const response = await fetch(`https://bookmycater.freewebhostmost.com/getMenuItems.php?category_name=${encodeURIComponent(category_name)}`);
      const data = await response.json();
      
      if (data.status === "success") {
        setMenuItems(data.data.items || []);
        setCategoryDetails(data.data.category || null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch menu items");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const getImageUrl = (imageUrl) => {
    if (imageUrl && !imageUrl.startsWith('http')) {
      return `https://bookmycater.freewebhostmost.com/getMenuItems.php${imageUrl}`;
    }
    return imageUrl;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl mb-4">{error}</p>
          <button 
            onClick={fetchMenuItems}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            {categoryDetails?.category_name || category_name}
          </h1>
          {categoryDetails?.description && (
            <p className="text-gray-600 max-w-2xl mx-auto">
              {categoryDetails.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getImageUrl(item.item_image)}
                  alt={item.item_name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = '/placeholder.jpg';
                    e.target.alt = 'Item image not found';
                    e.target.className = 'w-full h-full object-contain p-4';
                  }}
                />
                {item.is_available === 0 && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 m-2 rounded-full text-sm">
                    Out of Stock
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{item.item_name}</h3>
                  <span className="text-green-600 font-bold">
                    {formatPrice(item.price)}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{item.item_description}</p>

                <div className="flex justify-between items-center">
                  {item.is_available === 1 ? (
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300 flex items-center gap-2"
                      onClick={() => {
                        // Add to cart functionality
                        alert(`Added ${item.item_name} to cart`);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      className="bg-gray-300 text-gray-500 px-4 py-2 rounded cursor-not-allowed"
                      disabled
                    >
                      Out of Stock
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {menuItems.length === 0 && (
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <p className="text-xl">No items available in this category</p>
            <p className="text-sm mt-2">Please check back later</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuDetails;
