import React, { useState } from 'react';
import { menuSections } from './cocktaildiamondexotic';
import emailjs from 'emailjs-com';

const MIN_GUESTS = 50;
const MAX_GUESTS = 2000;

const CustomOrder = () => {
  const [selectedItems, setSelectedItems] = useState({
    snacks: [],
    beverages: [],
    sweets: [],
    vegFries: [],
    hotItems: [],
    salad: [],
    dipsAndSpreads: [],
  });

  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    alternateNumber: '',
    city: '',
    address: '',
    guestCount: MIN_GUESTS
  });

  const [userBasicDetails, setUserBasicDetails] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const [selectedSection, setSelectedSection] = useState(null);

  const updateGuestCount = (action) => {
    setUserDetails((prev) => {
      const isIncrement = action === "increment";
      const newCount = isIncrement
        ? Math.min(prev.guestCount + 5, MAX_GUESTS)
        : Math.max(prev.guestCount - 5, MIN_GUESTS);
      
      return { ...prev, guestCount: newCount };
    });
  };

  const toggleItemSelection = (section, item) => {
    const currentSelections = selectedItems[section] || [];

    // If item is already selected, deselect it
    if (currentSelections.includes(item)) {
      setSelectedItems({
        ...selectedItems,
        [section]: currentSelections.filter((selected) => selected !== item),
      });
      return;
    }

    // Add to selected items
    setSelectedItems({
      ...selectedItems,
      [section]: [...currentSelections, item],
    });
  };

  const handleBasicDetailsChange = (e) => {
    const { name, value } = e.target;
    setUserBasicDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
  
    // Validate basic details
    if (!userBasicDetails.name || !userBasicDetails.phone || !userBasicDetails.email) {
      alert('Please enter your name, phone number, and email');
      return;
    }
  
    // Prepare selected items list
    const selectedItemsList = Object.entries(selectedItems)
      .filter(([_, items]) => items.length > 0)
      .map(([section, items]) => `${section.replace(/([A-Z])/g, ' $1').toLowerCase()}: ${items.join(', ')}`)
      .join('\n');
  
    // Prepare email parameters for admin
    const adminEmailParams = {
      to_email: 'siddeshwarreddy616@gmail.com', // Admin's email
      from_name: userBasicDetails.name,
      user_email: userBasicDetails.email,
      phone_number: userBasicDetails.phone,
      guest_count: userDetails.guestCount,
      selected_items: selectedItemsList,
    };
  
    // Prepare email parameters for customer
    
  
    // Send email to admin
    emailjs.send(
      'service_bx320pc',      // Admin Email service ID
      'template_zz84tdd',     // Admin Template ID
      adminEmailParams,
      'VAYn37qIg4fET7cyU'      // Your EmailJS user ID
    )
    .then((adminResponse) => {
      console.log('Admin email sent successfully!', adminResponse.status, adminResponse.text);
  
      // Send confirmation email to customer with explicit recipient
      
    })
    .then((adminResponse) => {
    //   console.log('Customer confirmation email sent successfully!', customerResponse.status, customerResponse.text);
      alert('Submission successful! An executive will contact you shortly to discuss the details and confirm your order');
    })
    .catch((error) => {
      console.error('Email sending FAILED...', error);
      alert('Submission failed. Please try again.');
    });
  };

  

  const renderSelectedItemsList = () => {
    return (
      <div className="max-h-64 overflow-y-scroll border p-2 mt-2">
        {Object.entries(selectedItems).map(([section, items]) => {
          if (items.length === 0) return null;
  
          return (
            <div key={section} className="mb-2">
              <h5 className="font-semibold text-green-600 capitalize">
                {section.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </h5>
              <ul className="list-disc list-inside text-sm">
                {items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 bg-green-50 p-4 border-r overflow-y-auto">
        <h2 className="text-xl font-bold mb-6 text-green-700">Catering Menu</h2>
        {Object.entries(menuSections).map(([section, { title }]) => (
          <div
            key={section}
            className={`flex items-center justify-between px-4 py-3 rounded-md transition-colors cursor-pointer ${
              selectedSection === section ? 'bg-green-500 text-white' : 'hover:bg-green-100'
            }`}
            onClick={() => setSelectedSection(section)}
          >
            <span>{title}</span>
          </div>
        ))}
      </div>

      {/* Middle Section */}
      <div className="w-full md:w-1/2 p-8 overflow-y-auto">
        {selectedSection ? (
          <div>
            <h3 className="text-2xl font-semibold mb-6">
              {menuSections[selectedSection].title}
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
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Select a section from the sidebar to view items
          </div>
        )}
      </div>

      {/* User Details and Submission */}
      <div className="w-full md:w-1/5 p-5 bg-green-50">
        <div className="w-full max-w-md p-6 bg-green-100 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-4 text-green-700 text-center">Guest Count</h3>
          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={() => updateGuestCount("decrement")} 
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-l-md transition-colors"
            >
              -
            </button>
            <input 
              type="number" 
              value={userDetails.guestCount} 
              onChange={(e) => {
                const value = Math.max(MIN_GUESTS, Math.min(MAX_GUESTS, Number(e.target.value)));
                setUserDetails(prev => ({...prev, guestCount: value}));
              }}
              min={MIN_GUESTS}
              max={MAX_GUESTS}
              className="w-full p-2 text-center border rounded-md"               
              required
            />
            <button 
              onClick={() => updateGuestCount("increment")} 
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r-md transition-colors"
            >
              +
            </button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          <h3 className="text-lg font-bold mb-4 text-green-700 text-center">
            Basic Details
          </h3>
          <form onSubmit={sendEmail} className="space-y-4">
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              value={userBasicDetails.name}
              onChange={handleBasicDetailsChange}
              className="w-full p-2 border rounded"
              required
            />
            <input 
              type="tel" 
              name="phone"
              placeholder="Phone Number" 
              value={userBasicDetails.phone}
              onChange={handleBasicDetailsChange}
              className="w-full p-2 border rounded"
              required
            />
            <input 
              type="email" 
              name="email"
              placeholder="Email Address" 
              value={userBasicDetails.email}
              onChange={handleBasicDetailsChange}
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
            >
              Submit Catering Request
            </button>
          </form>
          
          {renderSelectedItemsList()}
        </div>
      </div>
    </div>
  );
};

export default CustomOrder;