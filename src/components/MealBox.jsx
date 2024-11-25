import React, { useState } from 'react';
import { Users, Utensils, ChevronRight, Plus, Minus, Calendar, MapPin, Leaf, Clock, Award, Star, DollarSign, X } from 'lucide-react';

const MenuCustomizer = ({ isOpen, onClose, packageType, selectedPackage, isVeg }) => {
  const [selectedItems, setSelectedItems] = useState({
    gravy: '',
    dal: '',
    bread: '',
    dessert: '',
    starter: ''
  });

  // Add this function inside the MenuCustomizer component
const handleConfirmSelection = () => {
  // Format the selected items into a readable message
  const formatMessage = () => {
    const menuItems = Object.entries(selectedItems)
      .filter(([_, value]) => value) // Remove empty selections
      .map(([category, item]) => `${category.charAt(0).toUpperCase() + category.slice(1)}: ${item}`)
      .join('\n');

    const message = `
         New Menu Selection:
         Package: ${selectedPackage}
         Type: ${isVeg ? 'Vegetarian' : 'Non-Vegetarian'}

         Selected Items:
           ${menuItems}
           `.trim();

    return encodeURIComponent(message);
  };

  // Create WhatsApp link with the formatted message
  const whatsappNumber = "917288041656"; // Format: country code (91) + number without '+'
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${formatMessage()}`;
  
  // Open WhatsApp in a new tab
  window.open(whatsappLink, '_blank');
  
  // Close the modal
  onClose();
};

  const menuOptions = {
    'Classic Veg Feast': {
      gravy: ['Paneer Butter Masala', 'Chole Masala', 'Mixed Veg Curry', 'Palak Paneer'],
      dal: ['Dal Makhni', 'Dal Tadka', 'Dal Fry', 'Yellow Dal'],
      bread: ['Naan', 'Roti', 'Peas Pulao', 'Jeera Rice'],
      dessert: ['Gulab Jamun', 'Rasmalai', 'Ice Cream', 'Kheer'],
      starter: ['Paneer Tikka', 'Veg Pakora', 'Aloo Tikki', 'Spring Roll']
    },
    'Exotic Veg Delight': {
      gravy: ['Thai Green Curry', 'Mexican Bean Stew', 'Ratatouille', 'Mushroom Stroganoff'],
      dal: ['Lentil Soup', 'Mediterranean Bean Stew', 'Mexican Bean Bowl', 'Moroccan Lentils'],
      bread: ['Focaccia', 'Garlic Bread', 'Herb Rice', 'Couscous'],
      dessert: ['Tiramisu', 'Panna Cotta', 'Churros', 'Baklava'],
      starter: ['Bruschetta', 'Spring Rolls', 'Falafel', 'Hummus']
    },
    'Green Garden Special': {
      gravy: ['Spinach Curry', 'Broccoli Almondine', 'Garden Vegetable Stew', 'Mushroom Masala'],
      dal: ['Green Moong Dal', 'Sprouted Lentil Curry', 'Mixed Bean Stew', 'Quinoa Bowl'],
      bread: ['Multigrain Roti', 'Brown Rice', 'Quinoa Pulao', 'Millet Rice'],
      dessert: ['Fresh Fruit Platter', 'Sugar-free Kheer', 'Date Halwa', 'Fruit Yogurt'],
      starter: ['Grilled Vegetables', 'Sprout Salad', 'Roasted Chickpeas', 'Cucumber Rolls']
    },
    'Royal Non-Veg Feast': {
      gravy: ['Butter Chicken', 'Mutton Rogan Josh', 'Chicken Tikka Masala', 'Fish Curry'],
      dal: ['Dal Makhni', 'Dal Tadka', 'Yellow Dal', 'Dal Fry'],
      bread: ['Naan', 'Butter Naan', 'Chicken Biryani', 'Jeera Rice'],
      dessert: ['Gulab Jamun', 'Rasmalai', 'Phirni', 'Zarda'],
      starter: ['Chicken Tikka', 'Fish Amritsari', 'Seekh Kebab', 'Tandoori Wings']
    },
    'Grilled Heaven': {
      gravy: ['Grilled Chicken Masala', 'BBQ Chicken', 'Pepper Chicken', 'Chicken Afgani'],
      dal: ['Dal Makhni', 'Yellow Dal Tadka', 'Dal Fry', 'Masoor Dal'],
      bread: ['Tandoori Roti', 'Butter Naan', 'Chicken Fried Rice', 'Jeera Rice'],
      dessert: ['Gulab Jamun', 'Ice Cream', 'Rabri', 'Kheer'],
      starter: ['Tandoori Chicken', 'Malai Tikka', 'Chicken 65', 'Chicken Lollipop']
    }
  };

  const getRequiredSelections = () => {
    switch(packageType) {
      case '3CP':
        return ['gravy', 'dal', 'bread'];
      case '5CP':
        return ['gravy', 'dal', 'bread', 'dessert', 'starter'];
      case '8CP':
        return ['gravy', 'dal', 'bread', 'dessert', 'starter', 'gravy2', 'dal2', 'bread2'];
      default:
        return [];
    }
  };

  const getItemsLeft = () => {
    const required = getRequiredSelections().length;
    const selected = Object.values(selectedItems).filter(item => item).length;
    return required - selected;
  };

  const handleSelect = (category, item) => {
    setSelectedItems(prev => ({
      ...prev,
      [category]: item
    }));
  };

  const CategorySelector = ({ category, options }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
        Select {category}
      </label>
      <div className="relative">
        <select
          value={selectedItems[category]}
          onChange={(e) => handleSelect(category, e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
        >
          <option value="">Click here to select</option>
          {options.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
      </div>
    </div>
  );

  if (!isOpen) return null;

  const requiredSelections = getRequiredSelections();
  const currentOptions = menuOptions[selectedPackage] || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Curate your menu</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Please select {requiredSelections.length} items • {getItemsLeft()} selections remaining
          </p>
        </div>

        {requiredSelections.map((category, index) => (
          <CategorySelector
            key={index}
            category={category}
            options={currentOptions[category.replace(/\d+$/, '')] || []}
          />
        ))}

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
         <button
            disabled={getItemsLeft() > 0}
            onClick={handleConfirmSelection}
            className={`px-6 py-3 rounded-lg text-white ${
              getItemsLeft() > 0 ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
             Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};

const FoodPackageSelector = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [peopleCount, setPeopleCount] = useState(1);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('3CP');
  const [isVeg, setIsVeg] = useState(true);
  const [isMenuCustomizerOpen, setIsMenuCustomizerOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const today = new Date().toISOString().split('T')[0];

  const cities = [
    'Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam',
    'Ramagundam', 'Secunderabad', 'Suryapet', 'Nalgonda', 'Adilabad'
  ];

  const packageImages = {
    '3CP': 'https://new.caterninja.com/PackedMealBox/3cp.png',
    '5CP': 'https://new.caterninja.com/PackedMealBox/5cp.png',
    '8CP': 'https://new.caterninja.com/PackedMealBox/8cp.png'
  };

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

  const incrementPeople = () => setPeopleCount(prev => prev + 1);
  const decrementPeople = () => setPeopleCount(prev => prev > 1 ? prev - 1 : 1);

  const handleCustomizeClick = (item) => {
    setSelectedMenuItem(item);
    setIsMenuCustomizerOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-green-500 text-white py-8 mb-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Custom Food Packages</h1>
          <p className="text-green-50">Design your perfect meal experience</p>
        </div>
      </div>

      {/* Section 1: Enhanced Input Fields */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute top-3 left-3">
                <Calendar className="text-green-500" size={24} />
              </div>
              <input
                type="date"
                min={today}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500focus:border-transparent"
              />
            </div>
            <div className="relative">
              <div className="absolute top-3 left-3">
                <MapPin className="text-green-500" size={24} />
              </div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <div className="absolute top-3 left-3">
                <Users className="text-green-500" size={24} />
              </div>
              <div className="flex items-center border-2 border-gray-200 rounded-lg">
                <button
                  onClick={decrementPeople}
                  className="p-3 hover:bg-gray-100 ml-8"
                >
                  <Minus size={20} />
                </button>
                <span className="flex-1 text-center">{peopleCount} People</span>
                <button
                  onClick={incrementPeople}
                  className="p-3 hover:bg-gray-100"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Package Type Selection */}
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
                  className="w-full h-32 object-cover rounded-lg mb-4"
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

      {/* Section 3: Veg/Non-Veg Toggle */}
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

      {/* Section 4: Menu Items */}
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
                  className="w-full md:w-48 h-48 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
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
                     
                      <span className="text-green-500" >{item.price}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCustomizeClick(item)}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center gap-2"
                  >
                    Customize Menu
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MenuCustomizer
        isOpen={isMenuCustomizerOpen}
        onClose={() => setIsMenuCustomizerOpen(false)}
        packageType={selectedPackage}
        selectedPackage={selectedMenuItem?.name}
        isVeg={isVeg}
      />
    </div>
  );
};

export default FoodPackageSelector;
