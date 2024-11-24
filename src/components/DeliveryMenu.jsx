
// import React, { useState } from 'react';
// import { menuItems, menuCategories } from './data'; // Import your data from data.js

// const DeliveryMenu = () => {
//   const [guestCount, setGuestCount] = useState('');
//   const [menuType, setMenuType] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedItems, setSelectedItems] = useState({});
//   const [showAlert, setShowAlert] = useState(false);

// const handleGuestCountSubmit = (e) => {
//   e.preventDefault();
//   const guests = parseInt(guestCount);
//   if (guests >= 10) {
//     setGuestCount(guests);
//   } else {
//     alert('Please enter at least 10 guests');
//     setGuestCount('');
//   }
// };

//   const handleMenuTypeSelect = (type) => {
//     setMenuType(type);
//     // Set the first available category as default
//     const firstCategory = menuCategories[type][0]?.id;
//     setSelectedCategory(firstCategory);
//   };

//   const handleCategorySelect = (categoryId) => {
//     setSelectedCategory(categoryId);
//   };

//   const isItemSelected = (item) => {
//     const categoryItems = selectedItems[selectedCategory] || [];
//     return categoryItems.some(selectedItem => selectedItem.id === item.id);
//   };

//   const handleAddItem = (item) => {
//     const currentCategoryItems = selectedItems[selectedCategory] || [];
//     const categoryLimit = menuCategories[menuType].find(cat => cat.id === selectedCategory).limit;

//     if (currentCategoryItems.length >= categoryLimit && !isItemSelected(item)) {
//       setShowAlert(true);
//       setTimeout(() => setShowAlert(false), 3000);
//     }

//     if (!isItemSelected(item)) {
//       setSelectedItems(prev => ({
//         ...prev,
//         [selectedCategory]: [...(prev[selectedCategory] || []), item]
//       }));
//     }
//   };

//   // Guest count selection screen
//  if (guestCount === '') {
//   return (
//     <div className="flex flex-col items-center gap-4 p-8">
//       <h1 className="text-2xl font-bold mb-4">Enter Number of Guests</h1>
//       <form onSubmit={handleGuestCountSubmit} className="flex flex-col gap-4">
//         <div className="flex flex-col gap-2">
//           <input
//             type="number"
//             min="10"
//             value={guestCount}
//             onChange={(e) => {
//               const value = e.target.value;
//               if (/^\d*$/.test(value)) { // Ensures only numeric input
//                 setGuestCount(value);
//               }
//             }}
//             className="border rounded px-4 py-2 w-64"
//             placeholder="Minimum 10 guests"
//             required
//           />
//           {guestCount !== '' && parseInt(guestCount) < 10 && (
//             <p className="text-red-500 text-sm">Minimum 10 guests required</p>
//           )}
//         </div>
//         <button
//           type="submit"
//           disabled={guestCount === '' || parseInt(guestCount) < 10}
//           className={`px-8 py-2 rounded ${
//             guestCount === '' || parseInt(guestCount) < 10
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-blue-500 hover:bg-blue-600'
//           } text-white`}
//         >
//           Continue
//         </button>
//       </form>
//     </div>
//   );
// }

//   // Menu type selection screen
//   if (!menuType) {
//     return (
//       <div className="flex flex-col items-center gap-4 p-8">
//         <h1 className="text-2xl font-bold mb-4">Select Menu Type</h1>
//         <div className="flex gap-4">
//           <button 
//             onClick={() => handleMenuTypeSelect('veg')}
//             className="bg-green-500 text-white px-8 py-4 rounded hover:bg-green-600"
//           >
//             Vegetarian
//           </button>
//           <button 
//             onClick={() => handleMenuTypeSelect('nonveg')}
//             className="bg-red-500 text-white px-8 py-4 rounded hover:bg-red-600"
//           >
//             Non-Vegetarian
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <div className="mb-4">
//         <p className="text-lg font-bold">Number of Guests: {guestCount}</p>
//       </div>
      
//       {/* Categories Navigation */}
//       <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
//         {menuCategories[menuType].map((category) => (
//           <button
//             key={category.id}
//             onClick={() => handleCategorySelect(category.id)}
//             className={`px-4 py-2 rounded whitespace-nowrap ${
//               selectedCategory === category.id
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-gray-200 hover:bg-gray-300'
//             }`}
//           >
//             {category.name}
//           </button>
//         ))}
//       </div>

//       {/* Alert for limit exceeded */}
//       {showAlert && (
//         <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
//           <h3 className="font-bold">Additional Charge Notice</h3>
//           <p>You've exceeded the limit for this category. Additional charges will apply.</p>
//         </div>
//       )}

//       {/* Selected Items Summary */}
//       <div className="mb-4 p-4 bg-gray-100 rounded">
//         <h2 className="font-bold mb-2">Selected Items:</h2>
//         {Object.entries(selectedItems).map(([category, items]) => (
//           <div key={category}>
//             <h3 className="font-semibold">{category} ({items.length})</h3>
//             <ul className="ml-4">
//               {items.map(item => (
//                 <li key={item.id}>{item.name}</li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>

//       {/* Menu Items Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {menuItems[menuType][selectedCategory]?.map((item) => (
//           <div key={item.id} className="border rounded-lg overflow-hidden">
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="font-bold">{item.name}</h3>
// {/*               <p className="text-gray-600">${item.price}</p> */}
//             </div>
//             <div className="p-4">
//               <button 
//                 onClick={() => handleAddItem(item)}
//                 className={`w-full py-2 rounded ${
//                   isItemSelected(item)
//                     ? 'bg-green-500 text-white'
//                     : 'bg-blue-500 text-white hover:bg-blue-600'
//                 }`}
//               >
//                 {isItemSelected(item) ? 'Added' : 'Add to Order'}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DeliveryMenu;



import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

const DeliveryMenu = () => {
  const [guestCount, setGuestCount] = useState('');
  const [menuType, setMenuType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [showAlert, setShowAlert] = useState(false);

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
    
    if (isItemSelected(item)) {
      // Remove item if already selected
      setSelectedItems(prev => ({
        ...prev,
        [selectedCategory]: currentCategoryItems.filter(i => i.id !== item.id)
      }));
      return;
    }

    const categoryLimit = menuCategories[menuType].find(cat => cat.id === selectedCategory).limit;
    if (currentCategoryItems.length >= categoryLimit) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }

    setSelectedItems(prev => ({
      ...prev,
      [selectedCategory]: [...(prev[selectedCategory] || []), item]
    }));
  };

  // Initial screen with guest count and menu type selection
  if (guestCount === '' || !menuType) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
            Delivery Menu
          </h1>
          
          <form onSubmit={handleGuestCountSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-green-700">
                Number of Guests
              </label>
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
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                placeholder="Minimum 10 guests"
                required
              />
              {guestCount !== '' && parseInt(guestCount) < 10 && (
                <p className="text-red-500 text-sm">Minimum 10 guests required</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-green-700 mb-2">
                Menu Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleMenuTypeSelect('veg')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    menuType === 'veg'
                      ? 'bg-green-600 text-white'
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  Vegetarian
                </button>
                <button
                  type="button"
                  onClick={() => handleMenuTypeSelect('nonveg')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    menuType === 'nonveg'
                      ? 'bg-green-600 text-white'
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  Non-Vegetarian
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={guestCount === '' || parseInt(guestCount) < 10 || !menuType}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                guestCount === '' || parseInt(guestCount) < 10 || !menuType
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold text-green-800">Guests: {guestCount}</p>
            <p className="text-lg font-bold text-green-800">
              {menuType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'} Menu
            </p>
          </div>
        </div>
        
        {/* Categories Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {menuCategories[menuType].map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-green-600 text-white'
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Alert */}
        {showAlert && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg">
            <h3 className="font-bold">Category Limit Reached</h3>
            <p>You've reached the maximum items for this category.</p>
          </div>
        )}

        {/* Selected Items Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-green-800 mb-4">Selected Items</h2>
          {Object.entries(selectedItems).map(([category, items]) => (
            <div key={category} className="mb-4 last:mb-0">
              <h3 className="font-semibold text-green-700">
                {category} ({items.length})
              </h3>
              <ul className="ml-4 space-y-2">
                {items.map(item => (
                  <li key={item.id} className="flex items-center text-green-600">
                    <span className="mr-2">•</span>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems[menuType][selectedCategory]?.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-green-800 mb-4">{item.name}</h3>
                <button 
                  onClick={() => handleAddItem(item)}
                  className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                    isItemSelected(item)
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {isItemSelected(item) ? (
                    <>
                      <Trash2 className="w-5 h-5" />
                      Remove
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Add to Order
                    </>
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
