import React, { useState, useEffect } from 'react';
import { menuSections } from './cocktaildiamondexotic';
import { User, Mail, Phone, Users, Plus, Minus, Check, X } from 'lucide-react';

const pricingData = {
  snacks: { basePrice: 70, extraItemPrice: 90 },
  dipsAndSpreads: { basePrice: 50 },
  beverages: { basePrice: 85, extraItemPrice: 130 },
  salad: { basePrice: 50 },
  sweets: { basePrice: 75, extraItemPrice: 110 },
  hotItems: { basePrice: 90 },
  vegFries: { basePrice: 75, extraItemPrice: 95 },
};

const MenuSelection = () => {
  const [selectedItems, setSelectedItems] = useState({
    snacks: [],
    beverages: [],
    sweets: [],
    vegFries: [],
    hotItems: [],
    salad: [],
    dipsAndSpreads: [],
  });
  const [showPrices, setShowPrices] = useState(false);
  const [extraItemAlertOpen, setExtraItemAlertOpen] = useState(false);
  const [extraItemSection, setExtraItemSection] = useState('');
  const [extraItemToAdd, setExtraItemToAdd] = useState('');
  const [selectedSection, setSelectedSection] = useState(null);
  const [validationAlert, setValidationAlert] = useState(null);

  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    guestCount: 10
  });

  const [discount, setDiscount] = useState(0);

  const toggleItemSelection = (section, item) => {
    const currentSelections = selectedItems[section] || [];
    const sectionLimit = menuSections[section].limit;

    if (currentSelections.includes(item)) {
      setSelectedItems({
        ...selectedItems,
        [section]: currentSelections.filter((selected) => selected !== item),
      });
      return;
    }

    if (currentSelections.length < sectionLimit) {
      setSelectedItems({
        ...selectedItems,
        [section]: [...currentSelections, item],
      });
    } else {
      setExtraItemSection(section);
      setExtraItemToAdd(item);
      setExtraItemAlertOpen(true);
    }
  };

  const handleUserDetailsChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const updateGuestCount = (action) => {
    setUserDetails(prev => {
      const newCount = action === 'increment' 
        ? Math.min(prev.guestCount + 1, 200) 
        : Math.max(prev.guestCount - 1, 10);
      return { ...prev, guestCount: newCount };
    });
  };

  useEffect(() => {
    const discountTiers = [
      { minGuests: 20, discountPercentage: 5 },
      { minGuests: 50, discountPercentage: 10 },
      { minGuests: 100, discountPercentage: 15 },
      { minGuests: 150, discountPercentage: 20 }
    ];

    const applicableDiscount = discountTiers
      .filter(tier => userDetails.guestCount >= tier.minGuests)
      .pop();

    setDiscount(applicableDiscount ? applicableDiscount.discountPercentage : 0);
  }, [userDetails.guestCount]);

  const handleExtraItemConfirm = () => {
    const currentSelections = selectedItems[extraItemSection] || [];
    setSelectedItems({
      ...selectedItems,
      [extraItemSection]: [...currentSelections, extraItemToAdd],
    });
    setExtraItemAlertOpen(false);
  };

  const calculatePrices = () => {
    const prices = Object.keys(selectedItems).reduce((acc, section) => {
      const sectionData = pricingData[section] || {};
      const basePrice = sectionData.basePrice || 0;
      const extraItemPrice = sectionData.extraItemPrice || 0;

      const sectionLimit = menuSections[section] ? menuSections[section].limit : 0;
      const selectedItemsForSection = selectedItems[section] || [];

      const baseItems = selectedItemsForSection.slice(0, sectionLimit);
      const extraItems = selectedItemsForSection.slice(sectionLimit);

      acc[section] = {
        baseItemsCount: baseItems.length,
        baseItemsPrice: baseItems.length * basePrice * userDetails.guestCount,
        extraItemsCount: extraItems.length,
        extraItemsPrice: extraItems.length * extraItemPrice * userDetails.guestCount,
      };

      return acc;
    }, {});

    const subtotal = Object.values(prices).reduce(
      (total, section) => total + section.baseItemsPrice + section.extraItemsPrice,
      0
    );
    const gst = subtotal * 0.18;
    const discountAmount = subtotal * (discount / 100);
    const totalWithGST = subtotal + gst - discountAmount;

    return { 
      prices, 
      subtotal, 
      gst, 
      discountAmount, 
      totalWithGST, 
      discountPercentage: discount 
    };
  };

  const validateAndShowPrices = () => {
    const validationErrors = [];

    // Check form fields
    if (!userDetails.fullName) validationErrors.push("Please enter full name");
    if (!userDetails.email) validationErrors.push("Please enter email");
    if (!userDetails.phoneNumber) validationErrors.push("Please enter phone number");

    // Check section selections
    Object.entries(menuSections).forEach(([section, { title, limit }]) => {
      const selectedCount = (selectedItems[section] || []).length;
      if (selectedCount < limit) {
        validationErrors.push(`Please select ${limit} items for ${title}`);
      }
    });

    if (validationErrors.length > 0) {
      setValidationAlert({
        type: 'error',
        messages: validationErrors
      });
      return;
    }

    setShowPrices(true);
    setValidationAlert(null);
  };

  const { subtotal, gst, discountAmount, totalWithGST, discountPercentage } = calculatePrices();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/5 bg-green-50 p-4 border-r overflow-y-auto">
        <h2 className="text-xl font-bold mb-6 text-green-700">Catering Menu</h2>
        <div className="space-y-3">
          {Object.entries(menuSections).map(([section, { title, limit }]) => {
            const selectedItemsCount = (selectedItems[section] || []).length;
            const isLimitReached = selectedItemsCount >= limit;

            return (
              <div
                key={section}
                className={`flex items-center justify-between px-4 py-3 rounded-md transition-colors ${
                  selectedSection === section
                    ? 'bg-green-500 text-white'
                    : 'hover:bg-green-100'
                }`}
                onClick={() => setSelectedSection(section)}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isLimitReached
                        ? 'bg-green-500 text-white'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {isLimitReached ? (
                      <Check className="h-6 w-6" />
                    ) : (
                      <span className="font-medium">{selectedItemsCount}/{limit}</span>
                    )}
                  </div>
                  <span className="font-medium">{title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Middle Section */}
      <div className="w-1/2 p-8 overflow-y-auto relative">
        {/* User Details Form */}
        <div className="mb-6 bg-white p-6 rounded-lg shadow-md border border-green-100">
          <h3 className="text-xl font-semibold mb-4 text-green-700 flex items-center">
            <Users className="mr-2 text-green-500" /> Customer Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
              <input
                type="text"
                name="fullName"
                value={userDetails.fullName}
                onChange={handleUserDetailsChange}
                placeholder="Full Name"
                className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
                required
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleUserDetailsChange}
                placeholder="Email Address"
                className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
                required
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
              <input
                type="tel"
                name="phoneNumber"
                value={userDetails.phoneNumber}
                onChange={handleUserDetailsChange}
                placeholder="Phone Number"
                className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => updateGuestCount('decrement')}
                className="bg-green-100 p-2 rounded-full hover:bg-green-200"
              >
                <Minus className="text-green-600" size={20} />
              </button>
              <input
                type="number"
                name="guestCount"
                value={userDetails.guestCount}
                onChange={handleUserDetailsChange}
                min="10"
                max="200"
                className="w-full p-2 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
                required
              />
              <button 
                onClick={() => updateGuestCount('increment')}
                className="bg-green-100 p-2 rounded-full hover:bg-green-200"
              >
                <Plus className="text-green-600" size={20} />
              </button>
            </div>
          </div>
          {discount > 0 && (
            <div className="mt-4 bg-green-50 p-3 rounded-md text-green-700">
              Group Discount: {discount}% applied for {userDetails.guestCount} guests
            </div>
          )}
        {/* </div> */}
        </div>

        {/* Section Items Selection */}
        {selectedSection ? (
          <div>
            <h3 className="text-2xl font-semibold mb-6">
              {menuSections[selectedSection].title} 
              <span className="text-gray-500 text-base ml-2">
                (Select {menuSections[selectedSection].limit} items)
              </span>
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {menuSections[selectedSection].items.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`${selectedSection}-${item}`}
                    checked={(selectedItems[selectedSection] || []).includes(item)}
                    onChange={() => toggleItemSelection(selectedSection, item)}
                    className="h-4 w-4"
                  />
                  <label
                    htmlFor={`${selectedSection}-${item}`}
                    className="text-sm font-medium"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Selected: {(selectedItems[selectedSection] || []).length} / 
              {menuSections[selectedSection].limit}
            </p>

            <button
              onClick={validateAndShowPrices}
              className="mt-6 w-full bg-green-500 text-white py-3 rounded-md"
            >
              View Prices
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Select a section from the sidebar to view items
          </div>
        )}

         {/* Validation Alert */}
      {validationAlert && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="text-red-700">
              {validationAlert.messages.map((message, index) => (
                <div key={index} className="flex items-center mb-2">
                  <X className="mr-2 text-red-500" size={18} />
                  {message}
                </div>
              ))}
            </div>
            <button
              onClick={() => setValidationAlert(null)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-md"
            >
              Understand
            </button>
          </div>
        </div>
      )}
      </div>

      {/* Order Summary - Right Side */}
<div className="w-1/5 p-4 bg-green-50 overflow-scroll">
  <div className=" bg-green-50 z-10 overflow-scroll">
    <h3 className="text-lg font-bold mb-4 text-green-700">Order Summary</h3>
    
    {/* Always display Selected Items */}
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-md overflow-scroll">
        <h4 className="text-md font-semibold mb-3 text-green-700">Selected Items</h4>
        {Object.entries(menuSections).map(([section, { title }]) => {
          const items = selectedItems[section] || [];
          if (items.length === 0) return null;

          return (
            <div key={section} className="mb-4 bg-green-50 p-3 rounded-md overflow-scroll">
              <h5 className="font-semibold text-green-700 mb-2">{title}</h5>
              {/* Render items as a list */}
              <ul className="list-disc pl-6 space-y-1">
                {items.map((item, index) => (
                  <li key={index} className="text-sm">
                    {item}{" "}
                    {items.length > menuSections[section].limit && index >= menuSections[section].limit ? (
                      <span className="text-xs text-yellow-600 ml-2">Extra</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Display prices only if showPrices is true */}
      {showPrices && (
        <div className="border-t mt-4 pt-2">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>GST (18%):</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between mb-2 text-green-600">
              <span>Group Discount ({discount}%):</span>
              <span>-₹{discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold border-t pt-2">
            <span>Total Price:</span>
            <span>₹{totalWithGST.toFixed(2)}</span>
          </div>
          <button
        onClick={() => {
          const message = encodeURIComponent(
            `* Catering Order Summary:*\n\n` +
            `*Customer Details:*\n` +
            `Name: ${userDetails.fullName}\n` +
            `Email: ${userDetails.email}\n` +
            `Phone: ${userDetails.phoneNumber}\n` +
            `Guest Count: ${userDetails.guestCount}\n\n` +
            `*Subtotal:* ₹${subtotal.toFixed(2)}\n` +
            `*GST (18%):* ₹${gst.toFixed(2)}\n` +
            (discount > 0 ? `*Group Discount (${discount}%):* -₹${discountAmount.toFixed(2)}\n` : '') +
            `*Total Price:* ₹${totalWithGST.toFixed(2)}\n\n` +
            `*Selected Items:*\n\n` +
            Object.entries(selectedItems)
              .map(
                ([section, items]) =>
                  `*${section.toUpperCase()}:*\n${(items || [])
                    .map((item) => `- ${item}`)
                    .join("\n") || "- None"}`
              )
              .join("\n\n")
          );
          window.open(`https://wa.me/917288041656?text=${message}`, "_blank");
        }}
        className="w-full mt-4 bg-green-600 text-white py-3 rounded hover:bg-green-700"
      >
        Proceed to Pay
      </button>
        </div>
        
      )}

      
    </div>
  </div>
</div>


       {/* Extra Item Alert */}
       {extraItemAlertOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h4 className="text-lg font-bold mb-4">Extra Item Charge</h4>
            <p>
              You've selected more items than the base package limit. This item will be
              charged at a higher rate. Do you want to proceed?
            </p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setExtraItemAlertOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleExtraItemConfirm}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuSelection;
