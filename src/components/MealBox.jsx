import React, { useState } from 'react';
import { Users, Utensils, ChevronRight, Plus, Minus, Calendar, MapPin, Leaf, Clock, Award, Star, DollarSign } from 'lucide-react';

const FoodPackageSelector = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [peopleCount, setPeopleCount] = useState(1);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('3CP');
  const [isVeg, setIsVeg] = useState(true);

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
          price: '₹999',
          rating: 4.5,
          time: '45 mins'
        },
        {
          id: 2,
          name: 'Exotic Veg Delight',
          image: 'https://5.imimg.com/data5/SELLER/Default/2024/7/433427466/FL/GI/JO/3869089/3cp-meal-tray-1000x1000.jpeg',
          description: 'International vegetarian cuisine with unique flavors',
          price: '₹1299',
          rating: 4.7,
          time: '50 mins'
        },
        {
          id: 3,
          name: 'Green Garden Special',
          image: 'https://neeyog.com/wp-content/uploads/2018/12/IMG_2577-1.png',
          description: 'Fresh and healthy vegetarian specialties',
          price: '₹1099',
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
          price: '₹1499',
          rating: 4.8,
          time: '55 mins'
        },
        {
          id: 5,
          name: 'Grilled Heaven',
          image: 'https://neeyog.com/wp-content/uploads/2018/12/IMG_2584.png',
          description: 'Perfectly grilled specialties with rich flavors',
          price: '₹1699',
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
          price: '₹1999',
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
          price: '₹2499',
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
          price: '₹2999',
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
          price: '₹3499',
          rating: 4.9,
          time: '80 mins'
        }
      ]
    }
  };

  const incrementPeople = () => setPeopleCount(prev => prev + 1);
  const decrementPeople = () => setPeopleCount(prev => prev > 1 ? prev - 1 : 1);

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
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
  {/* Icon positioned at the top-left corner */}
  <div className="absolute top-3 left-3">
    <Users className="text-green-500" size={24} />
  </div>
  
  {/* Counter section */}
  <div className="flex items-center border-2 border-gray-200 rounded-lg pl-10"> 
    {/* Added padding to the left of the button group to avoid overlap */}
    <button
      onClick={decrementPeople}
      className="p-3 hover:bg-green-50 text-green-500"
    >
      <Minus size={20} />
    </button>
    <span className="flex-1 text-center text-lg">{peopleCount}</span>
    <button
      onClick={incrementPeople}
      className="p-3 hover:bg-green-50 text-green-500"
    >
      <Plus size={20} />
    </button>
  </div>
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
                <option value="">Select a city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Package Selection */}
      <div className="max-w-4xl mx-auto px-4">
        {/* Package Type Buttons */}
        <div className="flex justify-center gap-6 mb-12">
          {['3CP', '5CP', '8CP'].map((pkg) => (
            <button
              key={pkg}
              onClick={() => setSelectedPackage(pkg)}
              className={`group relative w-40 h-40 rounded-2xl overflow-hidden transition-transform transform hover:scale-105 ${
                selectedPackage === pkg ? 'ring-4 ring-green-500' : ''
              }`}
            >
              <img
                src={packageImages[pkg]}
                alt={`${pkg} Package`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent group-hover:from-green-900">
                <div className="absolute bottom-0 w-full p-4">
                  <span className="text-white text-xl font-bold">{pkg}</span>
                  <p className="text-green-50 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    {pkg === '3CP' ? 'Perfect for small gatherings' :
                     pkg === '5CP' ? 'Ideal for medium events' :
                     'Best for large celebrations'}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Enhanced Veg/Non-Veg Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white shadow-md flex rounded-full p-1">
            <button
              onClick={() => setIsVeg(true)}
              className={`px-8 py-3 rounded-full flex items-center gap-2 transition-colors ${
                isVeg ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-green-50'
              }`}
            >
              <Leaf size={20} />
              Veg
            </button>
            <button
              onClick={() => setIsVeg(false)}
              className={`px-8 py-3 rounded-full flex items-center gap-2 transition-colors ${
                !isVeg ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-red-50'
              }`}
            >
              <Utensils size={20} />
              Non-Veg
            </button>
          </div>
        </div>

        {/* Enhanced Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {packageData[selectedPackage][isVeg ? 'veg' : 'nonVeg'].map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="text-yellow-400" size={16} />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-1" />
                    <span className="text-sm">{item.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users size={16} className="mr-1" />
                    <span className="text-sm">{peopleCount} people</span>
                  </div>
                  <div className="flex items-center text-green-500 font-semibold">
                    <DollarSign size={16} className="mr-1" />
                    <span>{item.price}</span>
                  </div>
                </div>
                <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                  Customize Package
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodPackageSelector;
