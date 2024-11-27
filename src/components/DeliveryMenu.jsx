import React, { useState, useEffect } from 'react';
import { Users, Utensils, ShoppingCart, Leaf, Check, AlertCircle, X, User, Phone, MapPinIcon, Calendar } from 'lucide-react';
import { menuItems, menuCategories } from './data';

const UserInfoModal = ({ isOpen, onSubmit, onClose }) => {
  if (!isOpen) return null;

  const today = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    date: '',
    guestCount: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const nameValid = formData.name.trim().length > 2;
    const phoneValid = /^[6-9]\d{9}$/.test(formData.phone);
    const locationValid = formData.location.trim().length > 0;
    const dateValid = formData.date !== '';
    const guestCountValid = parseInt(formData.guestCount) >= 10;
    
    const formIsValid = nameValid && phoneValid && locationValid && dateValid && guestCountValid;
    
    setIsFormValid(formIsValid);
    
    return formIsValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    
    setFormData(updatedFormData);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const updatedFormData = {
      ...formData,
      phone: value
    };
    
    setFormData(updatedFormData);
    validateForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-all"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Let's Get Started!</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-green-500" size={20} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-green-500" size={20} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="10-digit mobile number"
                maxLength="10"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            {formData.phone.length > 0 && !/^[6-9]\d{9}$/.test(formData.phone) && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid 10-digit mobile number starting with 6-9
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-3 text-green-500" size={20} />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Your current city"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-green-500" size={20} />
              <input
                type="date"
                name="date"
                min={today}
                value={formData.date}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Guest Count</label>
            <div className="relative">
              <Users className="absolute left-3 top-3 text-green-500" size={20} />
              <input
                type="number"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                min="10"
                placeholder="Minimum 10 guests"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            {formData.guestCount && parseInt(formData.guestCount) < 10 && (
              <p className="text-red-500 text-sm mt-1">
                Minimum 10 guests required
              </p>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-3 rounded-lg border-2 border-gray-300 text-gray-700 transition-all hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-1/2 py-3 rounded-lg text-white transition-all ${
                isFormValid 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeliveryMenu = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [menuType, setMenuType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleUserInfoSubmit = (info) => {
    setUserInfo(info);
    setIsUserModalOpen(false);
  };

  const handleUserInfoModalClose = () => {
    setIsUserModalOpen(false);
  };

  const formatOrderDetails = () => {
    let message = " *New Delivery Order*\n\n";
    
    // Add user details
    message += ` *Name:* ${userInfo.name}\n`;
    message += ` *Phone:* ${userInfo.phone}\n`;
    message += ` *Location:* ${userInfo.location}\n`;
    message += ` *Date:* ${userInfo.date}\n`;
    message += ` *Guests:* ${userInfo.guestCount}\n\n`;
    
    // Add menu type
    message += ` *Menu Type:* ${menuType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}\n\n`;
    
    // Add selected items by category
    message += "*Selected Items:*\n";
    Object.entries(selectedItems).forEach(([category, items]) => {
  if (!items || items.length === 0) return;  // Skip if no items

  const categoryName = menuCategories[menuType]?.find(cat => cat.id === category)?.name;
  if (categoryName) {
    message += `\n *${categoryName}*\n`;
    items.forEach(item => {
      message += `- ${item.name}\n`;
    });
  }
});

    // Add total items
    message += `\n*Total Items Selected:* ${getTotalSelectedItems()}`;

    return message;
  };

  const getTotalSelectedItems = () => {
    return Object.values(selectedItems).reduce((total, items) => total + items.length, 0);
  };

  const handleCheckout = () => {
    if (!userInfo || !menuType || getTotalSelectedItems() === 0) {
      alert("Please complete all the steps before placing an order.");
      return;
    }

    const message = encodeURIComponent(formatOrderDetails());
    const whatsappURL = `https://wa.me/917288041656?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  const handleMenuTypeSelect = (type) => {
  if (menuCategories[type]) {  // Ensure menuCategories[type] exists
    setMenuType(type);
    const firstCategory = menuCategories[type][0]?.id;
    setSelectedCategory(firstCategory);
  } else {
    console.error("Invalid menu type selected:", type);
  }
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
    const categoryLimit = menuCategories[menuType]?.find(cat => cat.id === selectedCategory)?.limit || 0;

    if (isItemSelected(item)) {
      setSelectedItems(prev => ({
        ...prev,
        [selectedCategory]: currentCategoryItems.filter(i => i.id !== item.id)
      }));
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
      <UserInfoModal 
        isOpen={isUserModalOpen} 
        onSubmit={handleUserInfoSubmit} 
        onClose={handleUserInfoModalClose} 
      />

      {userInfo && (
        <div className="max-w-6xl mx-auto">
          {/* User Info Banner */}
          <div className="sticky top-4 z-50 mb-6">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-lg font-semibold text-gray-800">
                  {userInfo.name} | {userInfo.location} | {userInfo.guestCount} Guests
                </span>
              </div>
              {getTotalSelectedItems() > 0 && (
                <button
                  onClick={handleCheckout}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl transition-all"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Checkout ({getTotalSelectedItems()})</span>
                </button>
              )}
            </div>
          </div>

          {/* Menu Type Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 transform hover:shadow-xl transition-all">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Menu Type</h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleMenuTypeSelect('veg')}
                className={`group p-4 rounded-xl transition-all transform hover:scale-105 ${
                  menuType === 'veg'
                    ? 'bg-green-500 text-white shadow-lg'
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
                className={`group p-4 rounded-xl transition-all transform hover:scale-105 ${
                  menuType === 'nonveg'
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-white border-2 border-red-100 hover:border-red-300'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Utensils className={`w-8 h-8 ${menuType === 'nonveg' ? 'text-white' : 'text-red-500'}`} />
                  <span className="font-semibold">Non-Vegetarian</span>
                </div>
              </button>
            </div>
          </div>

          {/* Rest of the menu interface */}
          {parseInt(userInfo.guestCount) >= 10 && menuType && (
            <>
              {/* Categories Navigation */}
              <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                {menuCategories[menuType].map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all transform hover:scale-105 ${
                      selectedCategory === category.id
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-white hover:bg-green-50'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Alert */}
              {showAlert && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center gap-3 animate-fade-in">
                  <AlertCircle className="text-yellow-500" />
                  <div>
                    <h3 className="font-semibold text-yellow-800">Category Limit Reached</h3>
                    <p className="text-yellow-600">Additional items will incur extra charges.</p>
                  </div>
                </div>
              )}

              {/* Selected Items Summary */}
              {getTotalSelectedItems() > 0 && (
                <div className="mb-6 p-6 bg-white rounded-xl shadow-lg transform hover:shadow-xl transition-all">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ShoppingCart className="h-6 w-6 text-green-500" />
                    Selected Items
                  </h2>
                  {Object.entries(selectedItems).map(([category, items]) => (
                    <div key={category} className="mb-4 last:mb-0">
                      <h3 className="font-semibold text-green-600 mb-2">
                        {menuCategories[menuType].find(cat => cat.id === category)?.name} ({items.length})
                      </h3>
                      <div className="space-y-2">
                        {items.map(item => (
                          <div key={item.id} className="flex items-center justify-between bg-green-50 p-3 rounded-lg hover:bg-green-100 transition-colors">
                            <span className="font-medium">{item.name}</span>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleAddItem(item)}
                                className="text-red-500 hover:text-red-600 font-medium"
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
              )}

              {/* Menu Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems[menuType][selectedCategory]?.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-contain group-hover:scale-105 transition-transform"
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
      )}
    </div>
  );
};

export default DeliveryMenu;
