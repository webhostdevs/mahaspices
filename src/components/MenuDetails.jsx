import React, { useState } from 'react';
import { menuSections } from './cocktaildiamondexotic';



const pricingData = {
  snacks: { basePrice: 70, extraItemPrice: 90 },
  dipsAndSpreads: { basePrice: 50 },
  beverages: { basePrice: 85, extraItemPrice: 130 },
  salad: { basePrice: 50 },
  sweets: { basePrice: 75, extraItemPrice: 110 },
  hotItems: { basePrice: 90 },
  vegFries: { basePrice: 75, extraItemPrice: 95 }
};
const MenuSelection = () => {



  const [selectedItems, setSelectedItems] = useState({
    snacks: [],
    beverages: [],
    sweets: [],
    vegFries: [],
    hotItems: [],
    liveSweets: [],
    salad: [],
    dipsAndSpreads: [],

  });
  const [showPrices, setShowPrices] = useState(false);
  const [extraItemAlertOpen, setExtraItemAlertOpen] = useState(false);
  const [extraItemSection, setExtraItemSection] = useState('');
  const [extraItemToAdd, setExtraItemToAdd] = useState('');

  const toggleItemSelection = (section, item) => {
    const currentSelections = selectedItems[section];
    const sectionLimit = menuSections[section].limit;

    // If already selected, deselect
    if (currentSelections.includes(item)) {
      setSelectedItems({
        ...selectedItems,
        [section]: currentSelections.filter(selected => selected !== item)
      });
      return;
    }

    // If within limit, select normally
    if (currentSelections.length < sectionLimit) {
      setSelectedItems({
        ...selectedItems,
        [section]: [...currentSelections, item]
      });
    } else {
      // Open alert for extra item
      setExtraItemSection(section);
      setExtraItemToAdd(item);
      setExtraItemAlertOpen(true);
    }
  };

  const handleExtraItemConfirm = () => {
    const currentSelections = selectedItems[extraItemSection];
    setSelectedItems({
      ...selectedItems,
      [extraItemSection]: [...currentSelections, extraItemToAdd]
    });
    setExtraItemAlertOpen(false);
  };

  const calculatePrices = () => {
  // Log the data to debug
  console.log('pricingData:', pricingData);
  console.log('selectedItems:', selectedItems);
  console.log('menuSections:', menuSections);

  const prices = Object.keys(selectedItems).reduce((acc, section) => {
    // Ensure pricing data exists for the section
    const sectionData = pricingData[section] || {};
    const basePrice = sectionData.basePrice || 0;
    const extraItemPrice = sectionData.extraItemPrice || 0;

    // Check if basePrice and extraItemPrice are valid
    if (basePrice === 0) {
      console.error(`Missing basePrice for section: ${section}`);
    }
    if (extraItemPrice === 0) {
      console.error(`Missing extraItemPrice for section: ${section}`);
    }

    // Ensure section exists in selectedItems
    const sectionLimit = menuSections[section] ? menuSections[section].limit : 0;
    const selectedItemsForSection = selectedItems[section] || [];

    const baseItems = selectedItemsForSection.slice(0, sectionLimit);
    const extraItems = selectedItemsForSection.slice(sectionLimit);

    acc[section] = {
      baseItemsCount: baseItems.length,
      baseItemsPrice: baseItems.length * basePrice,
      extraItemsCount: extraItems.length,
      extraItemsPrice: extraItems.length * extraItemPrice
    };

    return acc;
  }, {});

  // Calculate subtotal, GST, and total price
  const subtotal = Object.values(prices).reduce(
    (total, section) => total + section.baseItemsPrice + section.extraItemsPrice, 
    0
  );

  // Log the subtotal for debugging
  console.log('Subtotal:', subtotal);

  const gst = subtotal * 0.18; // 18% GST
  const totalWithGST = subtotal + gst;

  // Log the final values for debugging
  console.log('GST:', gst);
  console.log('Total with GST:', totalWithGST);

  // Return the calculated values
  return { prices, subtotal, gst, totalWithGST };
};



  const isFormFilled = () => {
    // Check if minimum required items are selected
    const snacksSelected = selectedItems.snacks.length >= 6;
    const beveragesSelected = selectedItems.beverages.length >= 1;
    const sweetsSelected = selectedItems.sweets.length >= 2;

    return snacksSelected && beveragesSelected && sweetsSelected;
  };

  const renderPriceBreakdown = () => {
    const { prices, subtotal, gst, totalWithGST } = calculatePrices();

    return (
        <div className="mt-6 p-4 bg-gray-100 rounded">
        <ul className="pt-2 space-y-2">
          <li>
            <strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}
          </li>
          <li>
            <strong>GST (18%):</strong> ₹{gst.toFixed(2)}
          </li>
          <li className="text-lg font-bold">
            <strong>Total Price:</strong> ₹{totalWithGST.toFixed(2)}
          </li>
        </ul>
        <button
          onClick={() => {
            const message = encodeURIComponent(
              `* Catering Order Summary:*\n\n` +
              `*Subtotal:* ₹${subtotal.toFixed(2)}\n` +
              `*GST (18%):* ₹${gst.toFixed(2)}\n` +
              `*Total Price:* ₹${totalWithGST.toFixed(2)}\n\n` +
              `*Selected Items:*\n\n` +
              Object.entries(selectedItems)
                .map(
                  ([section, items]) =>
                    `*${section.toUpperCase()}:*\n${items
                      .map((item) => `- ${item}`)
                      .join("\n") || "- None"}`
                )
                .join("\n\n")
            );
            window.open(`https://wa.me/7288041656?text=${message}`, "_blank");
          }}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Proceed to Pay
        </button>
      </div>
      
    );
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg m-5">
        <h1 className='text-2xl font-bold mb-8 text-green-600 text-center'>Catering Menu</h1>
        <div>
          {Object.entries(menuSections).map(([section, { title, limit, items }]) => (
            <div key={section} className="mb-6">
              <h3 className="text-lg font-semibold mb-4">
                {title} (Select {limit} items)
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {items.map(item => (
                  <div key={item} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`${section}-${item}`}
                      checked={selectedItems[section].includes(item)}
                      onChange={() => toggleItemSelection(section, item)}
                    />
                    <label
                      htmlFor={`${section}-${item}`}
                      className="text-sm font-medium"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Selected: {selectedItems[section].length} / {limit}
              </p>
            </div>
          ))}









          
          <button 
            onClick={() => setShowPrices(true)}
            disabled={!isFormFilled()}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-md"
          >
            View Prices
          </button>

          {showPrices && renderPriceBreakdown()}
        </div>
      </div>

      {/* Extra Item Alert Dialog */}
      {extraItemAlertOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h4 className="text-lg font-bold mb-4">Extra Item Charge</h4>
            <p>
              You've selected more items than the base package limit. 
              This item will be charged at a higher rate. Do you want to proceed?
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
    </>
  );
};

export default MenuSelection;
