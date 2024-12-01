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
          message += `- ${item.name}\n`;
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
        <div className="flex overflow-x-auto pb-4">
          {menuCategories[menuType].map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`px-6 py-3 rounded-xl ${
                selectedCategory === category.id ? 'bg-green-500' : 'bg-white'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryMenu;
