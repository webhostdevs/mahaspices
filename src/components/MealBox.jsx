import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Minus, Leaf, Beef, ChevronRight } from "lucide-react";

const packageData = {
  "3CP": {
    veg: [
      {
        id: 1,
        name: "Classic Veg Feast",
        image: "https://5.imimg.com/data5/SELLER/Default/2023/2/BX/WK/QF/5331327/3cp-meal-tray-natraj-1000x1000.jpg",
        items: ["Biryani", "Curd", "Masala Curry"],
        price: "₹300",
        rating: 4.5,
        time: "45 mins",
      },
      {
        id: 2,
        name: "Veg Delight Platter",
        image: "https://5.imimg.com/data5/SELLER/Default/2023/2/BX/WK/QF/5331327/3cp-meal-tray-natraj-1000x1000.jpg",
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
        image: "https://neeyog.com/wp-content/uploads/2018/12/Screenshot_20190302-103929_Instagram.jpg",
        items: ["Biryani", "Curd", "Masala Curry"],
        price: "₹599",
        rating: 4.8,
        time: "55 mins",
      },
      {
        id: 5,
        name: "Non-Veg Gourmet Tray",
        image: "https://neeyog.com/wp-content/uploads/2018/12/Screenshot_20190302-103929_Instagram.jpg",
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
        image: "https://5.imimg.com/data5/SELLER/Default/2023/2/JT/IZ/ZG/5331327/5cp-meal-tray-natraj-white-1000x1000.jpg",
        items: ["Biryani", "Papad", "Sambar", "Curd", "Masala Curry"],
        price: "₹1000",
        rating: 4.7,
        time: "60 mins",
      },
      {
        id: 10,
        name: "Golden Veg Experience",
        image: "https://5.imimg.com/data5/SELLER/Default/2023/2/JT/IZ/ZG/5331327/5cp-meal-tray-natraj-white-1000x1000.jpg",
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
        image: "https://5.imimg.com/data5/ANDROID/Default/2024/4/413078008/VQ/BB/TG/26238021/img-20240406-wa0036-jpg-1000x1000.jpg",
        items: ["Biryani", "Chicken Curry", "Papad", "Sambar", "Curd"],
        price: "₹1099",
        rating: 4.8,
        time: "65 mins",
      },
      {
        id: 11,
        name: "Deluxe Non-Veg Tray",
        image: "https://5.imimg.com/data5/ANDROID/Default/2024/4/413078008/VQ/BB/TG/26238021/img-20240406-wa0036-jpg-1000x1000.jpg",
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
        image: "https://5.imimg.com/data5/SELLER/Default/2020/12/XT/MO/AF/9784128/8cp-meal-tray-natraj-1000x1000.jpg",
        items: ["Biryani", "Papad", "Paneer Curry", "Dal", "Curd", "Salad", "Raita"],
        price: "₹499",
        rating: 4.9,
        time: "75 mins",
      },
      {
        id: 12,
        name: "Heritage Veg Platter",
        image: "https://5.imimg.com/data5/SELLER/Default/2020/12/XT/MO/AF/9784128/8cp-meal-tray-natraj-1000x1000.jpg",
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
        image: "https://5.imimg.com/data5/ANDROID/Default/2023/10/348991234/QZ/NJ/RI/69120372/product-jpeg-1000x1000.jpg",
        items: ["Biryani", "Chicken Curry", "Fish Fry", "Sambar", "Curd", "Salad"],
        price: "₹499",
        rating: 4.9,
        time: "80 mins",
      },
      {
        id: 13,
        name: "Majestic Non-Veg Banquet",
        image: "https://5.imimg.com/data5/ANDROID/Default/2023/10/348991234/QZ/NJ/RI/69120372/product-jpeg-1000x1000.jpg",
        items: ["Biryani", "Chicken Curry", "Fish Fry", "Sambar", "Curd", "Salad"],
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

    const cartDetails = Object.entries(cart).map(([itemId, itemData]) => ({
      id: itemId,
      name: itemData.details.name,
      quantity: itemData.quantity,
      price: itemData.details.price,
      package: itemData.package,
    }));

    console.log("Proceeding to checkout with:", cartDetails);
    // You can add navigation or API call here
  };

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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Column for Filters and Package Selection */}
      <div className="w-1/4 p-6 bg-white shadow-lg">
        {/* Veg/Non-Veg Toggle */}
        <div className="mb-6 flex justify-center space-x-6">
          <div className="flex flex-col items-center">
            <button
              onClick={() => setIsVeg(true)}
              className={`flex items-center justify-center p-2 rounded-xl border-2 ${
                isVeg ? "border-green-500" : "border-gray-200"
              }`}
            >
              <Leaf color={isVeg ? "green" : "gray"} />
            </button>
            <span
              className={`mt-2 text-sm ${
                isVeg ? "text-green-500 font-bold" : "text-gray-500"
              }`}
            >
              Veg
            </span>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={() => setIsVeg(false)}
              className={`flex items-center justify-center p-2 rounded-xl border-2 ${
                !isVeg ? "border-red-500" : "border-gray-200"
              }`}
            >
              <Beef color={!isVeg ? "red" : "gray"} />
            </button>
            <span
              className={`mt-2 text-sm ${
                !isVeg ? "text-red-500 font-bold" : "text-gray-500"
              }`}
            >
              Non-Veg
            </span>
          </div>
        </div>

        {/* Package Selection */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-center">Select Package</h2>
          <div className="space-y-4">
            {Object.keys(packageData).map((pkg) => (
              <button
                key={pkg}
                onClick={() => setSelectedPackage(pkg)}
                className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all ${
                  selectedPackage === pkg
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-green-200"
                }`}
              >
                <img
                  src={packageImages[pkg]}
                  alt={`${pkg} Package`}
                  className="w-16 h-16 object-contain rounded-lg"
                />
                <span className="font-semibold">{pkg} Package</span>
                <ChevronRight 
                  className={selectedPackage === pkg ? "text-green-500" : "text-gray-400"}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column for Menu Items */}
      <div className="w-3/4 p-6">
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
