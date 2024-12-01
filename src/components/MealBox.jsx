import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Link } from "react-router-dom";
import { Users, Utensils, ChevronRight, Plus, Minus, Calendar, MapPin, Leaf, Clock, Star, Phone, User, MapPinIcon, X, ShoppingCart } from 'lucide-react';


const today = new Date().toISOString().split('T')[0];
const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai'];


const packageData = {
  '3CP': {
    veg: [
      {
        id: 1,
        name: 'Classic Veg Feast',
        image: 'https://5.imimg.com/data5/SELLER/Default/2023/2/BX/WK/QF/5331327/3cp-meal-tray-natraj-1000x1000.jpg',
        description: 'Traditional vegetarian delicacies with premium ingredients',
        price: '₹300',
        rating: 4.5,
        time: '45 mins'
      },
      {
        id: 2,
        name: 'Exotic Veg Delight',
        image: 'https://5.imimg.com/data5/SELLER/Default/2024/7/433427466/FL/GI/JO/3869089/3cp-meal-tray-1000x1000.jpeg',
        description: 'International vegetarian cuisine with unique flavors',
        price: '₹299',
        rating: 4.7,
        time: '50 mins'
      },
      {
        id: 3,
        name: 'Green Garden Special',
        image: 'https://neeyog.com/wp-content/uploads/2018/12/IMG_2577-1.png',
        description: 'Fresh and healthy vegetarian specialties',
        price: '₹499',
        rating: 4.6,
        time: '40 mins'
      }
    ],
    nonVeg: [
      {
        id: 4,
        name: 'Royal Non-Veg Feast',
        image: 'https://neeyog.com/wp-content/uploads/2018/12/Screenshot_20190302-103929_Instagram.jpg',
        description: 'Premium non-vegetarian delicacies',
        price: '₹599',
        rating: 4.8,
        time: '55 mins'
      },
      {
        id: 5,
        name: 'Grilled Heaven',
        image: 'https://neeyog.com/wp-content/uploads/2018/12/IMG_2584.png',
        description: 'Perfectly grilled specialties with rich flavors',
        price: '₹699',
        rating: 4.9,
        time: '60 mins'
      }
    ]
  },
  '5CP': {
    veg: [
      {
        id: 6,
        name: 'Premium Veg Banquet',
        image: 'https://5.imimg.com/data5/SELLER/Default/2023/2/JT/IZ/ZG/5331327/5cp-meal-tray-natraj-white-1000x1000.jpg',
        description: 'Luxurious vegetarian spread for special occasions',
        price: '₹1000',
        rating: 4.7,
        time: '60 mins'
      }
    ],
    nonVeg: [
      {
        id: 7,
        name: 'Gourmet Non-Veg Feast',
        image: 'https://5.imimg.com/data5/ANDROID/Default/2024/4/413078008/VQ/BB/TG/26238021/img-20240406-wa0036-jpg-1000x1000.jpg',
        description: 'Premium non-vegetarian banquet selection',
        price: '₹1099',
        rating: 4.8,
        time: '65 mins'
      }
    ]
  },
  '8CP': {
    veg: [
      {
        id: 8,
        name: 'Grand Veg Celebration',
        image: 'https://5.imimg.com/data5/SELLER/Default/2020/12/XT/MO/AF/9784128/8cp-meal-tray-natraj-1000x1000.jpg',
        description: 'Elaborate vegetarian feast for special events',
        price: '₹499',
        rating: 4.9,
        time: '75 mins'
      }
    ],
    nonVeg: [
      {
        id: 9,
        name: 'Ultimate Non-Veg Experience',
        image: 'https://5.imimg.com/data5/ANDROID/Default/2023/10/348991234/QZ/NJ/RI/69120372/product-jpeg-1000x1000.jpg',
        description: 'Exclusive non-vegetarian banquet selection',
        price: '₹499',
        rating: 4.9,
        time: '80 mins'
      }
    ]
  }
};

const packageImages = {
  '3CP': 'https://new.caterninja.com/PackedMealBox/3cp.png',
  '5CP': 'https://new.caterninja.com/PackedMealBox/5cp.png',
  '8CP': 'https://new.caterninja.com/PackedMealBox/8cp.png'
};
const handleCancel = () => {
  // Navigate to home page
  navigate('/');
};
  
const UserInfoModal = ({ isOpen, onSubmit, onClose }) => {
  // Move the null check to the top of the component
  if (!isOpen) return null;
  const navigate = useNavigate();
   const handleCancel = () => {
    onClose(); 
    navigate('/');
  };



  useEffect(() => {
    validateForm();
  }, [formData]);

 
    
    setIsFormValid(formIsValid);
    
    return formIsValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    
   

const FoodPackageSelector = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(true);
  
   const navigate = useNavigate();
  
  // Added missing state variables
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedCity, setSelectedCity] = useState('');
  const [peopleCount, setPeopleCount] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState('3CP');
  const [isVeg, setIsVeg] = useState(true);
   const [cart, setCart] = useState({});
  const [isMenuCustomizerOpen, setIsMenuCustomizerOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [selectedMenuItems, setSelectedMenuItems] = useState({});
  const packageDescriptions = {
    '3CP': [
      'Perfect for small gatherings',
      'Balanced meal with variety',
      'Cost-effective catering solution'
    ],
    '5CP': [
      'Ideal for medium-sized events',
      'Extensive menu selection',
      'Premium dining experience'
    ],
    '8CP': [
      'Luxurious option for grand celebrations',
      'Comprehensive multi-course meal',
      'Highest level of culinary diversity'
    ]
  };

  const handlePackageSelect = (item) => {
    setSelectedMenuItems(prev => ({
      ...prev,
      [item.id]: !prev[item.id]
    }));
  };

  

  const isItemSelected = (itemId) => {
    return selectedMenuItems[itemId] === true;
  };
 
 const addToCart = (item) => {
    setCart(prevCart => {
      const currentQuantity = prevCart[item.id] || 0;
      return {
        ...prevCart,
        [item.id]: currentQuantity + 1
      };
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
  };

  const calculateCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = Object.values(packageData)
        .flatMap(category => [...category.veg, ...category.nonVeg])
        .find(i => i.id === parseInt(itemId));
      
      const itemPrice = parseFloat(item.price.replace('₹', ''));
      return total + (itemPrice * quantity);
    }, 0);
  };

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const handleCustomizeClick = (item) => {
    setSelectedMenuItem(item);
    setIsMenuCustomizerOpen(true);
  };

  
  const MenuCustomizer = ({ isOpen, onClose, packageType, selectedPackage, isVeg }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl">
          <h2>Customize {selectedPackage} Menu</h2>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-gray-50">
     

     {/* Proceed to Checkout Button (Top Right Corner) */}
     {Object.keys(cart).length > 0 && (
        <div className="fixed top-4 right-4 z-10 flex items-center gap-4">
          <div className="bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2">
            <ShoppingCart size={20} className="text-green-500" />
            <span>{getTotalCartItems()} Items</span>
            <span className="font-bold">₹{calculateCartTotal()}</span>
          </div>
          <button
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center gap-2 shadow-lg"
          >
            Checkout
          </button>
        </div>
      )}



{/* Veg/Non-Veg Toggle */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Meal Preference</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setIsVeg(true)}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                isVeg ? 'border-green-500 bg-green-50' : 'border-gray-200'
              }`}
            >
              <Leaf className="mx-auto mb-2" size={24} />
              <span className="block text-center">Vegetarian</span>
            </button>
            <button
              onClick={() => setIsVeg(false)}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                !isVeg ? 'border-green-500 bg-green-50' : 'border-gray-200'
              }`}
            >
              <Utensils className="mx-auto mb-2" size={24} />
              <span className="block text-center">Non-Vegetarian</span>
            </button>
          </div>
        </div>
      </div>

      {/* Package Type Selection */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Select Package Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.keys(packageData).map((pkg) => (
              <button
                key={pkg}
                onClick={() => setSelectedPackage(pkg)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedPackage === pkg
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-200'
                }`}
              >
                <img
                  src={packageImages[pkg]}
                  alt={`${pkg} Package`}
                  className="w-full h-32 object-contain rounded-lg mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">{pkg} Package</h3>
                <p className="text-sm text-gray-600">
                  {pkg === '3CP' ? '3 Course Package' : 
                   pkg === '5CP' ? '5 Course Package' : 
                   '8 Course Package'}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Available Packages</h2>
          <div className="grid grid-cols-1 gap-6">
            {(packageData[selectedPackage]?.[isVeg ? 'veg' : 'nonVeg'] || []).map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row gap-6 p-6 border-2 border-gray-200 rounded-xl hover:border-green-200 transition-all"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full md:w-48 h-48 object-contain rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    {packageDescriptions[selectedPackage].map((desc, index) => (
                      <li key={index}>{desc}</li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="text-yellow-400" size={20} />
                      <span>{item.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="text-gray-400" size={20} />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">{item.price}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {cart[item.id] ? (
                      <div className="flex items-center border rounded-lg">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="px-3 py-1 bg-gray-100 rounded-l-lg"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4">{cart[item.id]}</span>
                        <button 
                          onClick={() => addToCart(item)}
                          className="px-3 py-1 bg-gray-100 rounded-r-lg"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};}

export default FoodPackageSelector;
