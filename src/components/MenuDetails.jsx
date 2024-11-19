import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MenuDetails = () => {
  const { categoryName } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, [categoryName]);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch(
        `https://bookmycater.freewebhostmost.com/getMenuItems.php?menuType=${encodeURIComponent(categoryName)}`
      );
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
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  const getImageUrl = (imageUrl) => {
    if (imageUrl && !imageUrl.startsWith("http")) {
      return `https://bookmycater.freewebhostmost.com/${imageUrl}`;
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
            {categoryDetails?.category_name || categoryName}
          </h1>
          {categoryDetails?.description && (
            <p className="text-gray-600 max-w-2xl mx-auto">
              {categoryDetails.description}
            </p>
          )}
        </div>

        {/* Beverages Heading */}
        {menuItems.some((item) => item.types === "Beverages") && (
          <h2 className="text-3xl font-bold text-green-600 mb-8 text-center">
            Beverages
          </h2>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Full Image */}
              <img
                src={getImageUrl(item.item_image)}
                alt={item.item_name}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.src = "/placeholder.jpg";
                  e.target.alt = "Item image not found";
                }}
              />

              {/* Bottom Details */}
              <div className="p-4 flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.item_name}
                </h3>
{/*                 <div className="text-green-600 font-bold mb-4">
                  {formatPrice(item.price)}
                </div> */}
                <button
                  className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 transition-colors duration-300"
                  onClick={() => {
                    alert(`${item.item_name} Successfully selected`);
                  }}
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuDetails;
