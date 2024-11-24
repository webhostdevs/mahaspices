import React, { useState } from 'react';
import { Users, Utensils, ChevronRight, Plus, Minus, Leaf, Check, AlertCircle } from 'lucide-react';
import { menuItems, menuCategories } from './data';

const DeliveryMenu = () => {
  const [guestCounts, setGuestCounts] = useState({
    first: '',
    second: ''
  });
  const [menuType, setMenuType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [itemGuestCounts, setItemGuestCounts] = useState({});

  const handleGuestCountChange = (input, value) => {
    if (/^\d*$/.test(value)) {
      setGuestCounts(prev => ({
        ...prev,
        [input]: value
      }));
    }
  };

  const getTotalGuests = () => {
    const first = parseInt(guestCounts.first) || 0;
    const second = parseInt(guestCounts.second) || 0;
    return first + second;
  };

  const isValidGuestCount = () => {
    return getTotalGuests() >= 10;
  };

  const handleMenuTypeSelect = (type) => {
    setMenuType(type);
    const firstCategory = menuCategories[type][0]?.id;
    setSelectedCategory(firstCategory);
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

    if (isItemSelected(item)) {
      setSelectedItems(prev => ({
        ...prev,
        [selectedCategory]: currentCategoryItems.filter(i => i.id !== item.id)
      }));
      const newGuestCounts = { ...itemGuestCounts };
      delete newGuestCounts[item.id];
      setItemGuestCounts(newGuestCounts);
    } else {
      if (currentCategoryItems.length >= categoryLimit) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }
      setSelectedItems(prev => ({
        ...prev,
        [selectedCategory]: [...currentCategoryItems, item]
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Guest Count and Menu Type Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Guest Count Inputs */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Guest Count</h2>
              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-green-500" />
                  </div>
                  <input
                    type="text"
                    value={guestCounts.first}
                    onChange={(e) => handleGuestCountChange('first', e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 border-2 border-green-100 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                    placeholder="First guest count"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-green-500" />
                  </div>
                  <input
                    type="text"
                    value={guestCounts.second}
                    onChange={(e) => handleGuestCountChange('second', e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 border-2 border-green-100 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                    placeholder="Second guest count"
                  />
                </div>
                <div className="flex items-center justify-between px-3 py-2 bg-green-50 rounded-lg">
                  <span className="font-semibold">Total Guests:</span>
                  <span className="text-green-600 font-bold">{getTotalGuests()}</span>
                </div>
                {!isValidGuestCount() && getTotalGuests() > 0 && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle size={16} />
                    <span>Minimum 10 guests required</span>
                  </div>
                )}
              </div>
            </div>

            {/* Menu Type Selection */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Menu Type</h2>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => handleMenuTypeSelect('veg')}
                  className={`group p-4 rounded-xl transition-all ${
                    menuType === 'veg'
                      ? 'bg-green-500 text-white'
                      : 'bg-white border-2 border-green-100 hover:border-green-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Leaf className={`w-8 h-8 ${menuType === 'veg' ? 'text-white' : 'text-green-500'}`} />
                    <span className="font-semibold">Vegetarian</span>
                  </div>
                </button>
                <button 
                  onClick={() => handleMenuTypeSelect('nonveg')}
                  className={`group p-4 rounded-xl transition-all ${
                    menuType === 'nonveg'
                      ? 'bg-green-500 text-white'
                      : 'bg-white border-2 border-green-100 hover:border-green-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Utensils className={`w-8 h-8 ${menuType === 'nonveg' ? 'text-white' : 'text-green-500'}`} />
                    <span className="font-semibold">Non-Vegetarian</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the menu interface */}
        {isValidGuestCount() && menuType && (
          <>
            {/* Categories Navigation */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
              {menuCategories[menuType].map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-green-500 text-white shadow-lg transform scale-105'
                      : 'bg-white hover:bg-green-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Alert */}
            {showAlert && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center gap-3">
                <AlertCircle className="text-yellow-500" />
                <div>
                  <h3 className="font-semibold text-yellow-800">Category Limit Reached</h3>
                  <p className="text-yellow-600">Additional items will incur extra charges.</p>
                </div>
              </div>
            )}

            {/* Selected Items Summary */}
            <div className="mb-6 p-6 bg-white rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-4">Selected Items</h2>
              {Object.entries(selectedItems).map(([category, items]) => (
                <div key={category} className="mb-4 last:mb-0">
                  <h3 className="font-semibold text-green-600 mb-2">
                    {menuCategories[menuType].find(cat => cat.id === category)?.name} ({items.length})
                  </h3>
                  <div className="space-y-2">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                        <span>{item.name}</span>
                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            value={itemGuestCounts[item.id] || ''}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d*$/.test(value)) {
                                setItemGuestCounts(prev => ({
                                  ...prev,
                                  [item.id]: value
                                }));
                              }
                            }}
                            placeholder="Guests"
                            className="w-24 px-3 py-1 border border-green-200 rounded-lg"
                          />
                          <button
                            onClick={() => handleAddItem(item)}
                            className="text-red-500 hover:text-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems[menuType][selectedCategory]?.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                    <button 
                      onClick={() => handleAddItem(item)}
                      className={`w-full py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                        isItemSelected(item)
                          ? 'bg-green-100 text-green-600 hover:bg-green-200'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {isItemSelected(item) ? (
                        <>
                          <Check size={20} />
                          Selected
                        </>
                      ) : (
                        'Add to Order'
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeliveryMenu;
