import React, { useState } from 'react';

const menuCategories = {
  veg: [
    { id: 'beverages', name: 'Beverages', limit: 2 },
    { id: 'starters', name: 'Starters', limit: 2 },
    { id: 'salads', name: 'Salads', limit: 1 },
    { id: 'sweets', name: 'Sweets', limit: 2 },
    { id: 'breads', name: 'Breads', limit: 3 },
    { id: 'special-rice', name: 'Special Rice', limit: 1 },
    { id: 'rice', name: 'Rice', limit: 1 },
    { id: 'main-course', name: 'Main Course', limit: 2 },
    { id: 'fries', name: 'Fries', limit: 1 },
    { id: 'curries', name: 'Curries', limit: 2 }
  ],
  nonveg: [
    { id: 'beverages', name: 'Beverages', limit: 2 },
    { id: 'starters', name: 'Starters', limit: 2 },
    { id: 'salads', name: 'Salads', limit: 1 },
    { id: 'sweets', name: 'Sweets', limit: 2 },
    { id: 'breads', name: 'Breads', limit: 3 },
    { id: 'special-rice', name: 'Special Rice', limit: 1 },
    { id: 'rice', name: 'Rice', limit: 1 },
    { id: 'main-course', name: 'Main Course', limit: 2 },
    { id: 'fries', name: 'Fries', limit: 1 },
    { id: 'curries', name: 'Curries', limit: 2 }
  ]
};

const menuItems = {
  veg: {
    beverages: [
      { id: 1, name: 'Mango Lassi', price: 4.99, image: '/api/placeholder/150/150' },
      { id: 2, name: 'Sweet Lassi', price: 3.99, image: '/api/placeholder/150/150' },
      { id: 3, name: 'Masala Chaas', price: 2.99, image: '/api/placeholder/150/150' }
    ],
    starters: [
      { id: 4, name: 'Paneer Tikka', price: 8.99, image: '/api/placeholder/150/150' },
      { id: 5, name: 'Veg Spring Roll', price: 6.99, image: '/api/placeholder/150/150' }
    ],
    // Add more categories as needed
  },
  nonveg: {
    beverages: [
      { id: 1, name: 'Mango Lassi', price: 4.99, image: '/api/placeholder/150/150' },
      { id: 2, name: 'Sweet Lassi', price: 3.99, image: '/api/placeholder/150/150' },
      { id: 3, name: 'Masala Chaas', price: 2.99, image: '/api/placeholder/150/150' }
    ],
    starters: [
      { id: 4, name: 'Chicken Tikka', price: 10.99, image: '/api/placeholder/150/150' },
      { id: 5, name: 'Fish Fingers', price: 9.99, image: '/api/placeholder/150/150' }
    ],
    // Add more categories as needed
  }
};

const DeliveryMenu = () => {
  const [guestCount, setGuestCount] = useState('');
  const [menuType, setMenuType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [showAlert, setShowAlert] = useState(false);

 
  const handleGuestCountSubmit = (e) => {
  e.preventDefault();
  if (guestCount > 0) {
    const guests = parseInt(guestCount);
    setGuestCount(guests);
  }
};

  const handleMenuTypeSelect = (type) => {
    setMenuType(type);
    setSelectedCategory('beverages');
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const isItemSelected = (item) => {
    const categoryItems = selectedItems[selectedCategory] || [];
    return categoryItems.some(selectedItem => selectedItem.id === item.id);
  };

  const handleAddItem = (item) => {
    const currentCategoryItems = selectedItems[selectedCategory] || [];
    const categoryLimit = menuCategories[menuType].find(cat => cat.id === selectedCategory).limit;

    if (currentCategoryItems.length >= categoryLimit && !isItemSelected(item)) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }

    if (!isItemSelected(item)) {
      setSelectedItems(prev => ({
        ...prev,
        [selectedCategory]: [...(prev[selectedCategory] || []), item]
      }));
    }
  };

  // Guest count selection screen
 if (guestCount === '') {
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-2xl font-bold mb-4">Enter Number of Guests</h1>
      <form onSubmit={handleGuestCountSubmit} className="flex flex-col gap-4">
        <input
          type="number"
          min="1"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
          className="border rounded px-4 py-2 w-64 text-center text-lg"
          placeholder="Enter number of guests"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-8 py-2 rounded hover:bg-blue-600"
          disabled={!guestCount || guestCount < 1}
        >
          Continue
        </button>
      </form>
    </div>
  );
}

  // Menu type selection screen
  if (!menuType) {
    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <h1 className="text-2xl font-bold mb-4">Select Menu Type</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => handleMenuTypeSelect('veg')}
            className="bg-green-500 text-white px-8 py-4 rounded hover:bg-green-600"
          >
            Vegetarian
          </button>
          <button 
            onClick={() => handleMenuTypeSelect('nonveg')}
            className="bg-red-500 text-white px-8 py-4 rounded hover:bg-red-600"
          >
            Non-Vegetarian
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <p className="text-lg font-bold">Number of Guests: {guestCount}</p>
      </div>
      
      {/* Categories Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
        {menuCategories[menuType].map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={`px-4 py-2 rounded whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Alert for limit exceeded */}
      {showAlert && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          <h3 className="font-bold">Additional Charge Notice</h3>
          <p>You've exceeded the limit for this category. Additional charges will apply.</p>
        </div>
      )}

      {/* Selected Items Summary */}
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h2 className="font-bold mb-2">Selected Items:</h2>
        {Object.entries(selectedItems).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-semibold">{category} ({items.length})</h3>
            <ul className="ml-4">
              {items.map(item => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems[menuType][selectedCategory]?.map((item) => (
          <div key={item.id} className="border rounded-lg overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold">{item.name}</h3>
           {/*   <p className="text-gray-600">${item.price}</p>   */}
            </div>
            <div className="p-4">
              <button 
                onClick={() => handleAddItem(item)}
                className={`w-full py-2 rounded ${
                  isItemSelected(item)
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {isItemSelected(item) ? 'Added' : 'Add to Order'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryMenu;
