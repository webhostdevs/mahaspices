import React from 'react';
import { Link } from 'react-router-dom';

const MealBoxesPage = () => {
  const mealBoxOptions = [
    {
      name: "3-Course Pack",
      description: "Perfect for individual meals with a balanced selection",
      price: "$12.99",
      courses: 3,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
      includes: [
        "Starter",
        "Main Course",
        "Dessert"
      ]
    },
    {
      name: "5-Course Pack",
      description: "Great for small gatherings with diverse flavors",
      price: "$19.99",
      courses: 5,
      image: "https://images.unsplash.com/photo-1600335305573-830a1cf80194?w=800&h=600&fit=crop",
      includes: [
        "Appetizer",
        "Soup",
        "Salad",
        "Main Course",
        "Dessert"
      ]
    },
    {
      name: "8-Course Pack",
      description: "Ultimate dining experience with gourmet selections",
      price: "$29.99",
      courses: 8,
      image: "https://images.unsplash.com/photo-1556909211-36987c5b5262?w=800&h=600&fit=crop",
      includes: [
        "Amuse-bouche",
        "Cold Appetizer",
        "Hot Appetizer",
        "Soup",
        "Salad",
        "Palate Cleanser",
        "Main Course",
        "Dessert"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Gourmet Meal Boxes</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our carefully crafted meal boxes, designed to bring restaurant-quality dining to your home.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {mealBoxOptions.map((box, index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
          >
            <div className="h-64 overflow-hidden">
              <img 
                src={box.image} 
                alt={box.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-green-700">{box.name}</h2>
                <span className="text-2xl font-semibold text-green-600">{box.price}</span>
              </div>
              
              <p className="text-gray-600 mb-4">{box.description}</p>
              
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Includes:</h3>
                <ul className="space-y-1 text-gray-700">
                  {box.includes.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <svg 
                        className="w-4 h-4 mr-2 text-green-500" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <button className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition-colors font-semibold">
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link 
          to="/" 
          className="text-green-600 hover:text-green-800 font-medium flex items-center justify-center"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default MealBoxesPage;
