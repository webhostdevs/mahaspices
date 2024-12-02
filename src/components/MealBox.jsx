import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Utensils, ChevronRight, Plus, Minus, Leaf, Beef } from "lucide-react";

const packageData = {
  "3CP": {
    veg: [
      {
        id: 1,
        name: "Classic Veg Feast",
        image:
          "https://5.imimg.com/data5/SELLER/Default/2023/2/BX/WK/QF/5331327/3cp-meal-tray-natraj-1000x1000.jpg",
        items: ["Biryani", "Curd", "Masala Curry"],
        price: "₹300",
        rating: 4.5,
        time: "45 mins",
      },
      {
        id: 2,
        name: "Veg Delight Platter",
        image:
          "https://5.imimg.com/data5/SELLER/Default/2023/2/BX/WK/QF/5331327/3cp-meal-tray-natraj-1000x1000.jpg",
        items: ["Biryani", "Curd", "Masala Curry"],
        price: "₹350",
        rating: 4.6,
        time: "50 mins",
      },
    ],
    nonVeg: [
      {
        id: 4,
        name: "Royal Non-Veg Feast",
        image:
          "https://neeyog.com/wp-content/uploads/2018/12/Screenshot_20190302-103929_Instagram.jpg",
        items: ["Biryani", "Curd", "Masala Curry"],
        price: "₹599",
        rating: 4.8,
        time: "55 mins",
      },
      {
        id: 5,
        name: "Non-Veg Gourmet Tray",
        image:
          "https://neeyog.com/wp-content/uploads/2018/12/Screenshot_20190302-103929_Instagram.jpg",
        items: ["Biryani", "Curd", "Masala Curry"],
        price: "₹650",
        rating: 4.7,
        time: "60 mins",
      },
    ],
  },
  "5CP": {
    veg: [
      {
        id: 6,
        name: "Premium Veg Banquet",
        image:
          "https://5.imimg.com/data5/SELLER/Default/2023/2/JT/IZ/ZG/5331327/5cp-meal-tray-natraj-white-1000x1000.jpg",
        items: ["Biryani", "Papad", "Sambar", "Curd", "Masala Curry"],
        price: "₹1000",
        rating: 4.7,
        time: "60 mins",
      },
      {
        id: 10,
        name: "Golden Veg Experience",
        image:
          "https://5.imimg.com/data5/SELLER/Default/2023/2/JT/IZ/ZG/5331327/5cp-meal-tray-natraj-white-1000x1000.jpg",
        items: ["Biryani", "Papad", "Sambar", "Curd", "Masala Curry"],
        price: "₹1050",
        rating: 4.8,
        time: "65 mins",
      },
    ],
    nonVeg: [
      {
        id: 7,
        name: "Non-Veg Feast",
        image:
          "https://5.imimg.com/data5/ANDROID/Default/2024/4/413078008/VQ/BB/TG/26238021/img-20240406-wa0036-jpg-1000x1000.jpg",
        items: ["Biryani", "Chicken Curry", "Papad", "Sambar", "Curd"],
        price: "₹1099",
        rating: 4.8,
        time: "65 mins",
      },
      {
        id: 11,
        name: "Deluxe Non-Veg Tray",
        image:
          "https://5.imimg.com/data5/ANDROID/Default/2024/4/413078008/VQ/BB/TG/26238021/img-20240406-wa0036-jpg-1000x1000.jpg",
        items: ["Biryani", "Chicken Curry", "Papad", "Sambar", "Curd"],
        price: "₹1150",
        rating: 4.9,
        time: "70 mins",
      },
    ],
  },
  "8CP": {
    veg: [
      {
        id: 8,
        name: "Grand Veg Celebration",
        image:
          "https://5.imimg.com/data5/SELLER/Default/2020/12/XT/MO/AF/9784128/8cp-meal-tray-natraj-1000x1000.jpg",
        items: ["Biryani", "Papad", "Paneer Curry", "Dal", "Curd", "Salad","Raita","Raitha"],
        price: "₹499",
        rating: 4.9,
        time: "75 mins",
      },
      {
        id: 12,
        name: "Heritage Veg Platter",
        image:
          "https://5.imimg.com/data5/SELLER/Default/2020/12/XT/MO/AF/9784128/8cp-meal-tray-natraj-1000x1000.jpg",
        items: ["Biryani", "Papad", "Paneer Curry", "Dal", "Curd", "Salad"],
        price: "₹550",
        rating: 4.9,
        time: "80 mins",
      },
    ],
    nonVeg: [
      {
        id: 9,
        name: "Ultimate Non-Veg Experience",
        image:
          "https://5.imimg.com/data5/ANDROID/Default/2023/10/348991234/QZ/NJ/RI/69120372/product-jpeg-1000x1000.jpg",
        items: [
          "Biryani",
          "Chicken Curry",
          "Fish Fry",
          "Sambar",
          "Curd",
          "Salad",
        ],
        price: "₹499",
        rating: 4.9,
        time: "80 mins",
      },
      {
        id: 13,
        name: "Majestic Non-Veg Banquet",
        image:
          "https://5.imimg.com/data5/ANDROID/Default/2023/10/348991234/QZ/NJ/RI/69120372/product-jpeg-1000x1000.jpg",
        items: [
          "Biryani",
          "Chicken Curry",
          "Fish Fry",
          "Sambar",
          "Curd",
          "Salad",
        ],
        price: "₹600",
        rating: 5.0,
        time: "85 mins",
      },
    ],
  },
};

const packageImages = {
  "3CP": "https://new.caterninja.com/PackedMealBox/3cp.png",
  "5CP": "https://new.caterninja.com/PackedMealBox/5cp.png",
  "8CP": "https://new.caterninja.com/PackedMealBox/8cp.png",
};

const MealBox = () => {
  const [selectedPackage, setSelectedPackage] = useState("3CP");
  const [isVeg, setIsVeg] = useState(true);
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  const addToCart = (item) => {
    setCart((prevCart) => {
      const currentItem = prevCart[item.id] || { quantity: 0, details: item };
      return {
        ...prevCart,
        [item.id]: {
          quantity: currentItem.quantity + 1,
          details: item,
          package: selectedPackage,
        },
      };
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCart((prevCart) => {
      if (newQuantity === 0) {
        const { [itemId]: removedItem, ...restCart } = prevCart;
        return restCart;
      }

      return {
        ...prevCart,
        [itemId]: {
          ...prevCart[itemId],
          quantity: newQuantity,
        },
      };
    });
  };

  const calculateCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, itemData]) => {
      const itemPrice = parseFloat(itemData.details.price.replace("₹", ""));
      return total + itemPrice * itemData.quantity;
    }, 0);
  };

  const calculateGST = () => {
    return Math.round(calculateCartTotal() * 0.18);
  };

  const handleCheckout = () => {
    if (Object.keys(cart).length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Prepare cart details for checkout
    const cartDetails = Object.entries(cart).map(([itemId, itemData]) => ({
      id: itemId,
      name: itemData.details.name,
      quantity: itemData.quantity,
      price: itemData.details.price,
      package: itemData.package,
    }));

    console.log("Proceeding to checkout with:", cartDetails);
  };

  // Group cart items by package
  const groupedCartItems = Object.entries(cart).reduce(
    (groups, [itemId, itemData]) => {
      const pkg = itemData.package;
      if (!groups[pkg]) {
        groups[pkg] = [];
      }
      groups[pkg].push({ itemId, ...itemData });
      return groups;
    },
    {}
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cart Summary */}
      {Object.keys(cart).length > 0 && (
        <div className="fixed top-35 right-4 z-10 bg-white shadow-lg rounded-lg p-4 w-84">
          <h3 className="font-bold mb-2">Cart Summary</h3>

          {/* Group cart items by package */}
          {Object.entries(groupedCartItems).map(([pkg, items]) => (
            <div key={pkg} className="mb-4">
              <div className="flex items-center mb-2">
                <img
                  src={packageImages[pkg]}
                  alt={`${pkg} Package`}
                  className="w-12 h-12 mr-2 object-contain"
                />
                <h4 className="font-semibold">{pkg} Package</h4>
              </div>
              {items.map(({ itemId, details, quantity }) => (
                <div key={itemId} className="flex justify-between mb-1 w-60">
                  <span>
                    {details.name} - ({quantity})
                  </span>
                  <strong>{details.price}</strong>
                </div>
              ))}
            </div>
          ))}

          <div className="border-t mt-2 pt-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{calculateCartTotal()}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹{calculateGST()}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{calculateCartTotal() + calculateGST()}</span>
            </div>
          </div>
          <button
            className="mt-4 w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      )}
      {/* Veg/Non-Veg Toggle */}

      {/* Package Selection */}
      <div className="max-w-[850px] mx-auto px-4 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="z-50 mb-4 flex space-x-6">
             <div className="flex items-center">
             {/* Package Selection */}
<div className="max-w-[850px] mx-auto px-4 mb-12">
  <div className="bg-white rounded-xl shadow-lg p-8">
    <div className="z-50 mb-4 flex space-x-6">
      <div className="flex flex-col items-center">
        <button
          onClick={() => setIsVeg(true)}
          className={`flex border-green-500 items-center justify-center p-2 rounded-xl border-2 transition-all`}
        >
          <div className="h-4 w-4 rounded-full bg-green-500"></div>
        </button>
        <span
          className={`mt-2 text-sm transition-all duration-300 ${
            isVeg
              ? "border border-b-4 border-green-500 px-4 rounded text-green-500"
              : "text-gray-500 border-transparent"
          }`}
        >
          Veg
        </span>
      </div>
      <div className="flex flex-col items-center">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={!isVeg}
            onChange={() => setIsVeg(!isVeg)}
            className="sr-only peer"
          />
          <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-600"></div>
        </label>
        <span
          className={`mt-2 text-sm transition-all duration-300 ${
            !isVeg
              ? "border border-b-4 border-red-500 px-4 rounded text-red-500"
              : "text-gray-500 border-transparent"
          }`}
        >
          Non-Veg
        </span>
      </div>
    </div>
  </div>
</div>
          </div>

          <h2 className="text-2xl font-bold mb-6">Select Package Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.keys(packageData).map((pkg) => (
              <button
                key={pkg}
                onClick={() => setSelectedPackage(pkg)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedPackage === pkg
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-green-200"
                }`}
              >
                <img
                  src={packageImages[pkg]}
                  alt={`${pkg} Package`}
                  className="w-full h-32 object-contain rounded-lg mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">{pkg} Package</h3>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Rest of the previous component remains the same... */}
      <div className="max-w-[850px] mx-auto px-4 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 gap-6">
            {packageData[selectedPackage][isVeg ? "veg" : "nonVeg"].map(
              (item) => (
                <div
                  key={item.id}
                  className={`p-4 border rounded-xl flex items-center justify-between ${
                    isVeg ? "border-green-200" : "border-red-200"
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h3
                        className={`font-semibold ${
                          isVeg ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        {item.name}
                      </h3>

                      <p className="text-gray-600 w-15 mb-3">{item.items.join(", ")}</p>

                      <div className="flex items-center gap-2 text-gray-600">
                        <div
                          className={`border-2 ${
                            isVeg
                              ? "border-green-500 p-1 rounded"
                              : "border-red-500 p-1 rounded"
                          }`}
                        >
                          <div
                            className={`w-3 h-3 rounded-full border-2 ${
                              isVeg
                                ? "bg-green-500 border-green-500"
                                : "bg-red-500 border-red-500"
                            }`}
                          ></div>
                        </div>
                        <span>{item.price}</span>
                      </div>
                    </div>
                  </div>

                  {cart[item.id] ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, cart[item.id].quantity - 1)
                        }
                        className={`${
                          isVeg ? "bg-green-500" : "bg-red-500"
                        } text-white rounded-full p-1`}
                      >
                        <Minus size={16} />
                      </button>
                      <span>{cart[item.id].quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, cart[item.id].quantity + 1)
                        }
                        className={`${
                          isVeg ? "bg-green-500" : "bg-red-500"
                        } text-white rounded-full p-1`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      className={`px-4 py-2 ${
                        isVeg ? "bg-green-500" : "bg-red-500"
                      } text-white rounded-lg`}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealBox;
