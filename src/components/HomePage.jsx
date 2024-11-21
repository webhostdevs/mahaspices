import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Utensils, 
  ChefHat, 
  Users, 
  Calendar, 
  ArrowRight, 
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Homepage = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Carousel images
  const images = [
    {
      url: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&h=400&fit=crop",
      title: "Exquisite Catering"
    },
    {
      url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=400&fit=crop",
      title: "Fine Dining"
    },
    {
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=400&fit=crop",
      title: "Special Events"
    },
    {
      url: "https://images.unsplash.com/photo-1522336572468-97b06e8ef143?w=1200&h=400&fit=crop",
      title: "Corporate Functions"
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Featured menus data
  const menus = [
    {
      id: 1,
      title: "Royal Feast",
      description: "A curated selection of royal Indian delicacies",
      items: ["Hyderabadi Biryani", "Rogan Josh", "Galouti Kebab"]
    },
    {
      id: 2,
      title: "Contemporary Fusion",
      description: "Modern interpretations of classic dishes",
      items: ["Indo-Chinese Tapas", "Tandoori Sushi", "Curry Bowl"]
    },
    {
      id: 3,
      title: "Traditional Heritage",
      description: "Time-honored recipes passed through generations",
      items: ["Village Style Curry", "Hand-made Breads", "Desert Platter"]
    }
  ];

 const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "158,598", label: "Happy Customers" },
  { value: "10,000+", label: "Unique Menus/Dishes" },
  { value: "450", label: "Staff Members" },
];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Carousel */}
        <div className="absolute inset-0 w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-black/40 z-10 " /> {/* Overlay */}
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
            
          {/* Carousel Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
            
          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-7xl font-bold">
              Crafting Culinary
              <br />
              Experiences
            </h1>
            <p className="text-xl max-w-2xl mx-auto text-gray-100">
              Where tradition meets innovation in every dish we serve. 
              Creating memorable moments through exceptional catering.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-colors">
                Book Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors">
                View Menu
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Curated Menus */}
<section className="py-24 px-4">
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4">Curated Menus</h2>
      <p className="text-gray-600">
        Discover our specially crafted selections
      </p>
    </div>

    {/* Menu Boxes */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          id: 1,
          title: "Mealbox",
          description: "Personalized mealboxes for your daily cravings.",
          image:
            "https://images.unsplash.com/photo-1598514981986-4b52016f2fe2?w=400&h=300&fit=crop",
          link: "/mealbox",
        },
        {
          id: 2,
          title: "Delivery",
          description: "Fast and fresh delivery, straight to your door.",
          image:
            "https://images.unsplash.com/photo-1556911220-e15b30f5f2d2?w=400&h=300&fit=crop",
          link: "/menu",
        },
        {
          id: 3,
          title: "Catering",
          description: "Exceptional catering for your special occasions.",
          image:
            "https://images.unsplash.com/photo-1565294124525-9e9b9d0ebcdb?w=400&h=300&fit=crop",
          link: "/menu",
        },
      ].map((box) => (
        <motion.div
          key={box.id}
          whileHover={{ y: -10 }}
          className="relative bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden transition-shadow"
          onClick={() => (window.location.href = box.link)} // Navigate on click
        >
          {/* Image */}
          <img
            src={box.image}
            alt={box.title}
            className="w-full h-48 object-cover"
          />

          {/* Content */}
          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-bold text-gray-800">{box.title}</h3>
            <p className="text-gray-600">{box.description}</p>
            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition">
              Know More
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-green-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4 bg-gray-50">
  <div className="max-w-7xl mx-auto">
    {/* Header Section */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-800 mb-4 ">Our Services</h2>
      <p className="text-gray-600">
        Comprehensive catering solutions for every occasion
      </p>
    </div>

    {/* Services Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
      {[
        {
          icon: <Users className="w-12 h-12 text-green-600" />,
          title: "Corporate Services",
        },
        {
          icon: <ChefHat className="w-12 h-12 text-green-600" />,
          title: "Wedding Services",
        },
        {
          icon: <Calendar className="w-12 h-12 text-green-600" />,
          title: "Events",
        },
        {
          icon: <MapPin className="w-12 h-12 text-green-600" />,
          title: "Venues",
        },
      ].map((service, index) => (
        <div
          key={index}
          className="flex flex-col items-center "
        >
          <div className="mb-4">{service.icon}</div>
          <h3 className="text-lg font-semibold text-gray-800">
            {service.title}
          </h3>
        </div>
      ))}
    </div>
  </div>
</section>

    
     
    </div>
  );
};

export default Homepage;
