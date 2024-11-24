import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const menuCategories = {
  veg: [
    { id: 'beverages', name: 'Beverages', limit: 2 },
    { id: 'starters', name: 'Starters', limit: 2 },
    { id: 'salads', name: 'Salads', limit: 1 },
    { id: 'sweets', name: 'Sweets', limit: 2 },
    { id: 'breads', name: 'Breads', limit: 3 },
    { id: 'special-rice', name: 'Special Rice', limit: 1 },
    { id: 'rice', name: 'Rice', limit: 1 },
    { id: 'main-course', name: 'Main Course', limit: 2 },
    { id: 'fries', name: 'Fries', limit: 1 },
    { id: 'curries', name: 'Curries', limit: 2 }
  ],
  nonveg: [
    { id: 'beverages', name: 'Beverages', limit: 2 },
    { id: 'starters', name: 'Starters', limit: 2 },
    { id: 'salads', name: 'Salads', limit: 1 },
    { id: 'sweets', name: 'Sweets', limit: 2 },
    { id: 'breads', name: 'Breads', limit: 3 },
    { id: 'special-rice', name: 'Special Rice', limit: 1 },
    { id: 'rice', name: 'Rice', limit: 1 },
    { id: 'main-course', name: 'Main Course', limit: 2 },
    { id: 'fries', name: 'Fries', limit: 1 },
    { id: 'curries', name: 'Curries', limit: 2 }
  ]
};

const menuItems = {
  veg: {
    beverages: [
      { id: 1, name: 'Mango Lassi', price: 4.99, image: '/api/placeholder/150/150' },
      { id: 2, name: 'Sweet Lassi', price: 3.99, image: '/api/placeholder/150/150' },
      { id: 3, name: 'Masala Chaas', price: 2.99, image: '/api/placeholder/150/150' }
    ],
    starters: [
      { id: 4, name: 'Paneer Tikka', price: 8.99, image: '/api/placeholder/150/150' },
      { id: 5, name: 'Veg Spring Roll', price: 6.99, image: '/api/placeholder/150/150' }
    ],
    // Add more categories as needed
  },
  nonveg: {
    beverages: [
      { id: 1, name: 'Mango Lassi', price: 4.99, image: '/api/placeholder/150/150' },
      { id: 2, name: 'Sweet Lassi', price: 3.99, image: '/api/placeholder/150/150' },
      { id: 3, name: 'Masala Chaas', price: 2.99, image: '/api/placeholder/150/150' }
    ],
    starters: [
      { id: 4, name: 'Chicken Tikka', price: 10.99, image: '/api/placeholder/150/150' },
      { id: 5, name: 'Fish Fingers', price: 9.99, image: '/api/placeholder/150/150' }
    ],
    // Add more categories as needed
  }
};

const DeliveryMenu = () => {
  const [menuType, setMenuType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleMenuTypeSelect = (type) => {
    setMenuType(type);
    setSelectedCategory('beverages');
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleAddItem = (item) => {
    const currentCategoryItems = selectedItems[selectedCategory] || [];
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

  if (!menuType) {
    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <h1 className="text-2xl font-bold mb-4">Select Menu Type</h1>
        <div className="flex gap-4">
          <Button 
            onClick={() => handleMenuTypeSelect('veg')}
            className="px-8 py-4 text-lg"
          >
            Vegetarian
          </Button>
          <Button 
            onClick={() => handleMenuTypeSelect('nonveg')}
            className="px-8 py-4 text-lg"
          >
            Non-Vegetarian
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Categories Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
        {menuCategories[menuType].map((category) => (
          <Button
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className="whitespace-nowrap"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Alert for limit exceeded */}
      {showAlert && (
        <Alert className="mb-4">
          <AlertTitle>Additional Charge Notice</AlertTitle>
          <AlertDescription>
            You've exceeded the limit for this category. Additional charges will apply.
          </AlertDescription>
        </Alert>
      )}

      {/* Selected Items Summary */}
      <div className="mb-4 p-4 bg-gray-100 rounded-lg">
        <h2 className="font-bold mb-2">Selected Items:</h2>
        {Object.entries(selectedItems).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-semibold">{category} ({items.length})</h3>
            <ul className="ml-4">
              {items.map(item => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems[menuType][selectedCategory]?.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
            </CardContent>
            <CardFooter className="p-4">
              <Button 
                onClick={() => handleAddItem(item)}
                className="w-full"
              >
                Add to Order
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DeliveryMenu;
