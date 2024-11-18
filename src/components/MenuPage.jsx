import React from "react";
import { useNavigate } from "react-router-dom";

const MenuPage = () => {
  const navigate = useNavigate();

  const menuData = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      category: "North Indian Dawat",
      details: "2 Starters + 5 Mains + 1 Dessert",
      price: "₹899",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      category: "North Indian Feast",
      details: "3 Starters + 4 Mains + 2 Desserts",
      price: "₹1199",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=150&h=150&fit=crop",
      category: "South Indian Splendor",
      details: "3 Starters + 6 Mains + 2 Desserts",
      price: "₹1099",
    },
  ];

  return (
    <div className="bg-white py-10 px-5">
      <h1 className="text-3xl font-bold text-green-600 text-center mb-8">
        Our Menu
      </h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {menuData.map((item) => (
          <div
            key={item.id}
            className="border border-green-600 rounded-lg shadow-lg p-4 bg-white hover:shadow-xl"
          >
            <img
              src={item.image}
              alt={item.category}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              {item.category}
            </h2>
            <p className="text-black mb-2">{item.details}</p>
            <p className="text-black font-bold mb-4">{item.price}</p>
            <button
              onClick={() => navigate(`/menu/${item.id}`)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              View More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
