import React, { useState } from 'react';
import { Users, Utensils, ChevronRight, Plus, Minus, Leaf, Check, AlertCircle } from 'lucide-react';
import { menuItems, menuCategories } from './data';

const DeliveryMenu = () => {
  const [guestCount, setGuestCount] = useState('');
  const [menuType, setMenuType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [itemGuestCounts, setItemGuestCounts] = useState({});

  const handleGuestCountSubmit = (e) => {
    e.preventDefault();
    const guests = parseInt(guestCount);
    if (guests >= 10) {
      setGuestCount(guests);
    } else {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      setGuestCount('');
    }
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
      // Remove item if already selected
      setSelectedItems(prev => ({
        ...prev,
        [selectedCategory]: currentCategoryItems.filter(i => i.id !== item.id)
      }));
      // Remove guest count for this item
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

  // Guest count selection screen
  if (guestCount === '') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-6">
            <Users className="text-green-500 w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Guest Count</h1>
          <form onSubmit={handleGuestCountSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="h-5 w-5 text-green-500" />
              </div>
              <input
                type="number"
                min="10"
                value={guestCount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setGuestCount(value);
                  }
                }}
                className="block w-full pl-10 pr-4 py-3 border-2 border-green-100 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                placeholder="Minimum 10 guests"
                required
              />
            </div>
            {showAlert && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle size={16} />
                <span>Minimum 10 guests required</span>
              </div>
            )}
            <button
              type="submit"
              disabled={guestCount === '' || parseInt(guestCount) < 10}
              className={`w-full py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-lg font-semibold ${
                guestCount === '' || parseInt(guestCount) < 10
                  ? 'bg-gray-200 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              Continue
              <ChevronRight size={20} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Menu type selection screen
  if (!menuType) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Select Menu Type</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button 
              onClick={() => handleMenuTypeSelect('veg')}
              className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              <div className="flex flex-col items-center gap-4">
                <Leaf className="w-16 h-16 text-green-500 group-hover:scale-110 transition-transform" />
                <span className="text-xl font-semibold text-gray-800">Vegetarian</span>
              </div>
            </button>
            <button 
              onClick={() => handleMenuTypeSelect('nonveg')}
              className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              <div className="flex flex-col items-center gap-4">
                <Utensils className="w-16 h-16 text-green-500 group-hover:scale-110 transition-transform" />
                <span className="text-xl font-semibold text-gray-800">Non-Vegetarian</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="text-green-500" />
            <span className="font-semibold">Guests: {guestCount}</span>
          </div>
          <button
            onClick={() => setMenuType(null)}
            className="flex items-center gap-2 text-green-500 hover:text-green-600"
          >
            <span>{menuType === 'veg' ? <Leaf size={20} /> : <Utensils size={20} />}</span>
            {menuType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
          </button>
        </div>

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
      </div>
    </div>
  );
};

export default DeliveryMenu;
