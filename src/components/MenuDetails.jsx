import React, { useState } from 'react';

const menuSections = {
  snacks: {
    title: 'PASS AROUND SNACKS-VEG',
    limit: 6,
    items: [
      'Cheese Balls', 'Cheese Potato Wedges Melt', 'Cheese Tart', 
      'Cocktail corn samosa', 'Corn Cheese Kabab', 'Corn Fitters', 
      'Corn Palak Roll', 'Crunchy Baby Corn', 'Cut Mirchi', 
      'Gold Coin', 'Golden Fried Baby Corn', 'Hara bhara Kabab', 
      'Masala Potato Fingers', 'Paneer Kesar Tikka', 'Paneer Shashlik', 
      'Potato Croquettes', 'Veg. Corn Rolls', 'Veg. Seekh Kabab', 
      'Veg. Shashlik', 'Veg. Tart'
    ]
  },
  beverages: {
    title: 'BEVERAGES',
    limit: 1,
    items: [
      'Water Melon', 'Pineapple', 'Musk Melon', 'Sugar Cane', 
      'Coconut Delight', 'Fruit Punch', 'Mango Masti', 'Litchi Punch', 
      'Grapes Pulpy kulfi', 'Orange Punch', 'Soft drinks'
    ]
  },
  sweets: {
    title: 'SWEETS',
    limit: 2,
    items: [
      'Badam Halwa', 'Mixed Fruit Halwa', 'Double Ka Meetha', 
      'Carrot Green Mixed Halwa', 'Qhubani Ka Meetha', 'Junnu', 
      'Pistabhog', 'Dry Chum Chum', 'Honey Belam Jalebi', 
      'Pineapple Jalebi', 'Tawa Mix Sweet', 'American Mal Puri', 
      'Baked Rasgulla', 'Gajrela', 'Basundi'
    ]
  }
};

const pricingData = {
  snacks: { basePrice: 50, extraItemPrice: 75 },
  beverages: { basePrice: 75, extraItemPrice: 100 },
  sweets: { basePrice: 60, extraItemPrice: 85 }
};

const MenuSelection = () => {
  const [selectedItems, setSelectedItems] = useState({
    snacks: [],
    beverages: [],
    sweets: []
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
    const prices = Object.keys(selectedItems).reduce((acc, section) => {
      const sectionLimit = menuSections[section].limit;
      const baseItems = selectedItems[section].slice(0, sectionLimit);
      const extraItems = selectedItems[section].slice(sectionLimit);

      acc[section] = {
        baseItemsCount: baseItems.length,
        baseItemsPrice: baseItems.length * pricingData[section].basePrice,
        extraItemsCount: extraItems.length,
        extraItemsPrice: extraItems.length * pricingData[section].extraItemPrice
      };

      return acc;
    }, {});

    const subtotal = Object.values(prices).reduce(
      (total, section) => total + section.baseItemsPrice + section.extraItemsPrice, 
      0
    );

    const gst = subtotal * 0.18; // 18% GST
    const totalWithGST = subtotal + gst;

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
              `*Order Summary:*\n\n` +
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
