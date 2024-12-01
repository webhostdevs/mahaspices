import React, { useState } from 'react';
import { 
  Utensils, 
  ShoppingCart, 
  Leaf, 
  Check, 
  PlusCircle, 
  MinusCircle, 
  ChevronLeft, 
  ChevronRight,
  Trash2 
} from 'lucide-react';
import { menuItems, menuCategories } from './data'; 
import './del.css';

const DeliveryMenu = () => {
  const [menuType, setMenuType] = useState('veg');
  const [selectedCategory, setSelectedCategory] = useState('beverages');
  const [selectedItems, setSelectedItems] = useState([]);
  const [guestCount, setGuestCount] = useState(1);

  const handleMenuTypeSelect = (type) => {
    setMenuType(type);
    setSelectedCategory('beverages');
    setSelectedItems([]);
  };

  const handleAddItem = (item) => {
    const existingItem = selectedItems.find(i => i.id === item.id);
    if (existingItem) {
      setSelectedItems(selectedItems.map(i => 
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (itemId) => {
    const existingItem = selectedItems.find(i => i.id === itemId);
    if (existingItem.quantity > 1) {
      setSelectedItems(selectedItems.map(i => 
        i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
      ));
    } else {
      setSelectedItems(selectedItems.filter(i => i.id !== itemId));
    }
  };

  const calculateTotals = () => {
    const subtotal = selectedItems.reduce((total, item) => total + (item.price * item.quantity * guestCount), 0);
    const tax = subtotal * 0.18;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotals();

  // Get categories based on selected menu type
  const categories = menuType ? menuCategories[menuType].map(cat => cat.id) : [];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar - Menu Type */}
      <div className="w-24 bg-white shadow-lg flex flex-col items-center py-8 space-y-4">
        <button 
          onClick={() => handleMenuTypeSelect('veg')}
          className={`p-3 rounded-lg ${menuType === 'veg' ? 'bg-green-500 text-white' : 'hover:bg-green-50'}`}
        >
          <Leaf className="w-8 h-8" />
          <span className="text-xs mt-1">Veg</span>
        </button>
        <button 
          onClick={() => handleMenuTypeSelect('nonveg')}
          className={`p-3 rounded-lg ${menuType === 'nonveg' ? 'bg-red-500 text-white' : 'hover:bg-red-50'}`}
        >
          <Utensils className="w-8 h-8" />
          <span className="text-xs mt-1">Non-Veg</span>
        </button>
      </div>

      {/* Central Menu Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        {!menuType ? (
          <div className="text-center text-gray-500">
            Please select a menu type
          </div>
        ) : (
          <>
            {/* Category Navigation */}
            <div className="relative flex items-center">
              {categories.length > 5 && (
                <button 
                  onClick={() => {
                    const container = document.getElementById('categoryContainer');
                    container.scrollBy({ left: -container.clientWidth * 0.9, behavior: 'smooth' });
                  }}
                  className="absolute mb-4 left-0 z-10 bg-white/70 rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <ChevronLeft className="text-gray-600" size={20} />
                </button>
              )}
              
              <div 
                id="categoryContainer"
                className="flex space-x-4 mx-8  mb-4 overflow-x-auto scroll-smooth no-scrollbar flex-grow"
              >
                {categories.map(category => (
                  <button 
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap shrink-0 ${
                      selectedCategory === category 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {menuCategories[menuType].find(cat => cat.id === category)?.name || category}
                  </button>
                ))}
              </div>
            
              {categories.length > 5 && (
                <button 
                  onClick={() => {
                    const container = document.getElementById('categoryContainer');
                    container.scrollBy({ left: container.clientWidth * 0.9, behavior: 'smooth' });
                  }}
                  className="absolute right-0 mb-4 z-10 bg-white/70 rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <ChevronRight className="text-gray-600" size={20} />
                </button>
              )}
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-2 gap-6">
              {menuItems[menuType][selectedCategory].map(item => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-green-600 font-semibold">₹{item.price.toFixed(2)}</span>
                      <button 
                        onClick={() => handleAddItem(item)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Right Sidebar - Order Summary */}
      <div className="w-96 bg-white shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Order Summary</h2>
          <div className="flex items-center space-x-2">
            <span>Guests:</span>
            <div className="flex items-center">
              <button 
                onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                className="text-gray-500 hover:text-gray-700"
              >
                <MinusCircle />
              </button>
              <span className="mx-2">{guestCount}</span>
              <button 
                onClick={() => setGuestCount(guestCount + 1)}
                className="text-gray-500 hover:text-gray-700"
              >
                <PlusCircle />
              </button>
            </div>
          </div>
        </div>

        {selectedItems.length === 0 ? (
          <div className="text-center text-gray-500">
            No items selected
          </div>
        ) : (
          <>
            {/* Selected Items List */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {selectedItems.map(item => (
                <div 
                  key={item.id} 
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                >
                  <div>
                    <span className="font-semibold">{item.name}</span>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <MinusCircle size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => handleAddItem(item)}
                        className="text-green-500 hover:text-green-600"
                      >
                        <PlusCircle size={16} />
                      </button>
                    </div>
                  </div>
                  <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Bill Details */}
            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button 
              className="w-full bg-green-500 text-white py-3 rounded-lg mt-6 hover:bg-green-600 transition-colors"
              disabled={selectedItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DeliveryMenu;
