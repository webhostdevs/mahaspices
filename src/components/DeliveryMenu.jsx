import React, { useState } from 'react';
import {
  Utensils,
  ShoppingCart,
  Leaf,
  Check,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { menuItems, menuCategories } from './data'; // Ensure correct structure in `data.js`
import { useNavigate } from 'react-router-dom';

const DeliveryMenu = () => {
  const navigate = useNavigate();
  const [menuType, setMenuType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const getTotalSelectedItems = () => {
    return Object.values(selectedItems).reduce(
      (total, items) => total + (items ? items.length : 0),
      0
    );
  };

  const formatOrderDetails = () => {
    let message = `*New Delivery Order*\n\n`;
    message += `*Menu Type:* ${
      menuType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'
    }\n\n`;
    message += '*Selected Items:*\n';

    Object.entries(selectedItems).forEach(([category, items]) => {
      if (!items || items.length === 0) return;
      const categoryName = menuCategories[menuType]?.find(
        (cat) => cat.id === category
      )?.name;
      if (categoryName) {
        message += `\n*${categoryName}*\n`;
        items.forEach((item) => {
          message += `- ${item.name} ($${item.price})\n`;
        });
      }
    });

    message += `\n*Total Items Selected:* ${getTotalSelectedItems()}`;
    return message;
  };

  const handleProceedToCheckout = () => {
    if (!menuType || getTotalSelectedItems() === 0) {
      alert('Please complete all the steps before placing an order.');
      return;
    }

    navigate('/checkout', {
      state: {
        menuType,
        selectedItems,
        orderDetails: formatOrderDetails(),
      },
    });
  };

  const handleMenuTypeSelect = (type) => {
    if (menuCategories[type]) {
      setMenuType(type);
      const firstCategory = menuCategories[type][0]?.id;
      setSelectedCategory(firstCategory);
    } else {
      console.error('Invalid menu type selected:', type);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const isItemSelected = (item) => {
    const categoryItems = selectedItems[selectedCategory] || [];
    return categoryItems.some(
      (selectedItem) => selectedItem.id === item.id
    );
  };

  const handleAddItem = (item) => {
    const currentCategoryItems = selectedItems[selectedCategory] || [];
    const categoryLimit =
      menuCategories[menuType]?.find(
        (cat) => cat.id === selectedCategory
      )?.limit || 0;

    if (isItemSelected(item)) {
      handleRemoveItem(selectedCategory, item);
    } else {
      if (currentCategoryItems.length >= categoryLimit) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        return;
      }
      setSelectedItems((prev) => ({
        ...prev,
        [selectedCategory]: [...currentCategoryItems, item],
      }));
    }
  };

  const handleRemoveItem = (categoryId, itemToRemove) => {
    setSelectedItems((prev) => {
      const updatedCategoryItems = (prev[categoryId] || []).filter(
        (item) => item.id !== itemToRemove.id
      );

      if (updatedCategoryItems.length === 0) {
        const { [categoryId]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [categoryId]: updatedCategoryItems,
      };
    });
  };

  const calculateTotalPrice = () => {
    return Object.entries(selectedItems).reduce((total, [category, items]) => {
      return total + items.reduce((categoryTotal, item) => categoryTotal + item.price, 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      {/* Menu Type Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Menu Type</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleMenuTypeSelect('veg')}
            className={`group p-4 rounded-xl transition-all transform hover:scale-105 ${
              menuType === 'veg'
                ? 'bg-green-500 text-white'
                : 'bg-white border-2 border-green-100'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <Leaf className="w-8 h-8" />
              <span className="font-semibold">Vegetarian</span>
            </div>
          </button>

          <button
            onClick={() => handleMenuTypeSelect('nonveg')}
            className={`group p-4 rounded-xl ${
              menuType === 'nonveg'
                ? 'bg-red-500 text-white'
                : 'bg-white border-2 border-red-100'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <Utensils className="w-8 h-8" />
              <span className="font-semibold">Non-Vegetarian</span>
            </div>
          </button>
        </div>
      </div>

      {/* Category Navigation */}
      {menuType && (
        <div className="flex overflow-x-auto pb-4 mb-4">
          {menuCategories[menuType].map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`px-6 py-3 rounded-xl mr-2 ${
                selectedCategory === category.id 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white border border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      {/* Menu Items Display */}
      {menuType && selectedCategory && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold mb-4">
            {menuCategories[menuType].find(cat => cat.id === selectedCategory)?.name}
          </h3>
          
          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems[menuType][selectedCategory].map((item) => (
              <div 
                key={item.id} 
                className={`border rounded-lg p-4 flex justify-between items-center transition-all ${
                  isItemSelected(item) 
                    ? 'bg-green-100 border-green-500' 
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => handleAddItem(item)}
                  className={`p-2 rounded-full ${
                    isItemSelected(item) 
                      ? 'bg-green-500 text-white' 
                      : 'bg-green-100 text-green-600'
                  }`}
                >
                  {isItemSelected(item) ? <Check /> : <Plus />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Summary */}
      {getTotalSelectedItems() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">
                {getTotalSelectedItems()} Items | Total: ${calculateTotalPrice().toFixed(2)}
              </p>
            </div>
            <button 
              onClick={handleProceedToCheckout}
              className="bg-green-500 text-white px-6 py-3 rounded-xl flex items-center gap-2"
            >
              Proceed to Checkout <ArrowRight />
            </button>
          </div>
        </div>
      )}

      {/* Category Limit Alert */}
      {showAlert && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-xl flex items-center gap-2">
          <AlertCircle />
          Category selection limit reached
        </div>
      )}
    </div>
  );
};

export default DeliveryMenu;
