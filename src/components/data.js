export const menuCategories = {
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

export const menuItems = {
  veg: {
    beverages: [
      { id: 'b1', name: 'Mango Lassi', price: 4.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'b2', name: 'Sweet Lassi', price: 3.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'b3', name: 'Masala Chaas', price: 2.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'b4', name: 'Fresh Lime Soda', price: 3.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'b5', name: 'Virgin Mojito', price: 4.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }
    ],
    starters: [
      { id: 's1', name: 'Paneer Tikka', price: 8.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 's2', name: 'Veg Spring Roll', price: 6.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 's3', name: 'Mushroom Manchurian', price: 7.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 's4', name: 'Corn Cheese Balls', price: 6.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 's5', name: 'Crispy Veg Fingers', price: 5.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }
    ],
    salads: [
      { id: 'sl1', name: 'Garden Fresh Salad', price: 5.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'sl2', name: 'Greek Salad', price: 6.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'sl3', name: 'Corn & Bean Salad', price: 5.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'sl4', name: 'Russian Salad', price: 6.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'sl5', name: 'Sprouts Salad', price: 4.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }
    ],
    sweets: [
      { id: 'sw1', name: 'Gulab Jamun', price: 4.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'sw2', name: 'Rasgulla', price: 4.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'sw3', name: 'Kheer', price: 5.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'sw4', name: 'Gajar Ka Halwa', price: 6.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'sw5', name: 'Rasmalai', price: 7.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }
    ],
    breads: [
      { id: 'br1', name: 'Butter Naan', price: 2.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'br2', name: 'Garlic Naan', price: 3.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'br3', name: 'Plain Roti', price: 1.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'br4', name: 'Laccha Paratha', price: 3.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'br5', name: 'Missi Roti', price: 2.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }
    ],
    'special-rice': [
      { id: 'sr1', name: 'Veg Biryani', price: 12.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'sr2', name: 'Kashmiri Pulao', price: 11.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'sr3', name: 'Paneer Biryani', price: 13.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'sr4', name: 'Mushroom Biryani', price: 12.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'sr5', name: 'Veg Fried Rice', price: 10.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }
    ],
    rice: [
      { id: 'r1', name: 'Steamed Rice', price: 4.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'r2', name: 'Jeera Rice', price: 5.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'r3', name: 'Ghee Rice', price: 6.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'r4', name: 'Curd Rice', price: 5.49, image: '' },
      { id: 'r5', name: 'Lemon Rice', price: 5.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }
    ],
    'main-course': [
      { id: 'm1', name: 'Paneer Butter Masala', price: 12.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'm2', name: 'Dal Makhani', price: 10.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'm3', name: 'Malai Kofta', price: 11.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'm4', name: 'Veg Kadai', price: 11.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'm5', name: 'Mushroom Masala', price: 10.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }
    ],
    fries: [
      { id: 'f1', name: 'French Fries', price: 4.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'f2', name: 'Masala Fries', price: 5.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'f3', name: 'Sweet Potato Fries', price: 5.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'f4', name: 'Cheese Fries', price: 6.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'f5', name: 'Curly Fries', price: 5.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }
    ],
    curries: [
      { id: 'c1', name: 'Chana Masala', price: 8.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'c2', name: 'Rajma Masala', price: 9.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'c3', name: 'Aloo Gobi', price: 7.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'c4', name: 'Bhindi Masala', price: 8.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'c5', name: 'Mixed Veg Curry', price: 9.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }
    ]
  },
  nonveg: {
     beverages: [
      { id: 'nb1', name: 'Mango Lassi', price: 4.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nb2', name: 'Sweet Lassi', price: 3.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nb3', name: 'Masala Chaas', price: 2.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nb4', name: 'Fresh Lime Soda', price: 3.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nb5', name: 'Virgin Mojito', price: 4.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }
    ],
    starters: [
      { id: 'ns1', name: 'Chicken Tikka', price: 10.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'ns2', name: 'Fish Fingers', price: 11.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'ns3', name: 'Tandoori Wings', price: 9.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'ns4', name: 'Mutton Seekh Kebab', price: 12.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'ns5', name: 'Prawn Koliwada', price: 13.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }
    ],
    salads: [
      { id: 'nsl1', name: 'Chicken Caesar Salad', price: 8.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nsl2', name: 'Grilled Chicken Salad', price: 9.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nsl3', name: 'Tuna Salad', price: 10.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nsl4', name: 'Egg Salad', price: 7.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nsl5', name: 'Seafood Salad', price: 12.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }
    ],
    sweets: [
      { id: 'nsw1', name: 'Gulab Jamun', price: 4.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nsw2', name: 'Rasgulla', price: 4.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nsw3', name: 'Kheer', price: 5.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nsw4', name: 'Gajar Ka Halwa', price: 6.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nsw5', name: 'Rasmalai', price: 7.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }
    ],
    breads: [
      { id: 'nbr1', name: 'Butter Naan', price: 2.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nbr2', name: 'Garlic Naan', price: 3.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nbr3', name: 'Plain Roti', price: 1.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nbr4', name: 'Laccha Paratha', price: 3.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nbr5', name: 'Missi Roti', price: 2.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }
    ],
    'special-rice': [
      { id: 'nsr1', name: 'Chicken Biryani', price: 14.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nsr2', name: 'Mutton Biryani', price: 16.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nsr3', name: 'Prawn Biryani', price: 15.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nsr4', name: 'Fish Biryani', price: 14.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nsr5', name: 'Egg Biryani', price: 12.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }
    ],
    rice: [
      { id: 'nr1', name: 'Chicken Fried Rice', price: 11.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nr2', name: 'Egg Rice', price: 9.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nr3', name: 'Prawn Rice', price: 12.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nr4', name: 'Mixed Fried Rice', price: 11.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' },
      { id: 'nr5', name: 'Schezwan Rice', price: 10.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' } ], 
    'main-course': [ 
      { id: 'nm1', name: 'Butter Chicken', price: 13.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }, 
      { id: 'nm2', name: 'Mutton Rogan Josh', price: 15.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }, 
      { id: 'nm3', name: 'Chicken Curry', price: 12.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }, 
      { id: 'nm4', name: 'Fish Curry', price: 14.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }, 
      { id: 'nm5', name: 'Prawn Masala', price: 13.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' } 
    ],
    fries: [ 
      { id: 'nf1', name: 'Chicken Nuggets', price: 7.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }, 
      { id: 'nf2', name: 'Fish Fingers', price: 8.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }, 
      { id: 'nf3', name: 'Crispy Chicken Strips', price: 7.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }, 
      { id: 'nf4', name: 'Prawn Tempura', price: 9.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }, 
      { id: 'nf5', name: 'Spicy Wings', price: 8.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' } 
    ], 
    curries: [ 
      { id: 'nc1', name: 'Chicken Korma', price: 13.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }, 
      { id: 'nc2', name: 'Mutton Keema', price: 15.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }, 
      { id: 'nc3', name: 'Fish Moilee', price: 14.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }, 
      { id: 'nc4', name: 'Egg Curry', price: 10.49, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' }, 
      { id: 'nc5', name: 'Prawn Curry', price: 13.99, image: 'https://c8.alamy.com/comp/PT81W7/food-word-text-with-black-and-white-love-heart-suitable-for-card-brochure-or-typography-logo-design-PT81W7.jpg' } 
    ]
  }
};
