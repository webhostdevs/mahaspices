import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 
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
  ChevronRight,
} from "lucide-react";

import mlb1 from "../assets/mlb1.jpeg";
import mlb2 from "../assets/mlb2.jpeg";
import mlb3 from "../assets/mlb3.jpeg";
import mlb4 from "../assets/mlb4.jpeg";
import mlb5 from "../assets/mlb5.jpeg";
import dl from "../assets/dl.jpg";
import dlb from "../assets/dlb.png";
import delbox from "../assets/delbox.png";

const Homepage = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuBoxSlides, setMenuBoxSlides] = useState({
    mealbox: 0,
    delivery: 0,
    catering: 0
  });

  const navigate = useNavigate();

  // Auto-advance main carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance menu box carousels
  useEffect(() => {
    const timers = {
      mealbox: setInterval(() => {
        setMenuBoxSlides(prev => ({
          ...prev,
          mealbox: (prev.mealbox + 1) % 5
        }));
      }, 3000),
      delivery: setInterval(() => {
        setMenuBoxSlides(prev => ({
          ...prev,
          delivery: (prev.delivery + 1) % 3
        }));
      }, 3000),
      catering: setInterval(() => {
        setMenuBoxSlides(prev => ({
          ...prev,
          catering: (prev.catering + 1) % 3
        }));
      }, 3000)
    };

    return () => {
      Object.values(timers).forEach(timer => clearInterval(timer));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simplified navigation handler
  const handleKnowMoreClick = (link) => {
    navigate(link);
  };

  const images = [
    {
      url: "https://mahaspice.in/images/bg-2.jpg",
      title: "Exquisite Catering",
    },
    {
      url: "https://mahaspice.in/images/bg-1.jpg",
      title: "Exquisite Catering",
    },
    {
      url: "https://mahaspice.in/images/bg-3.jpg",
      title: "Exquisite Catering",
    },
  ];

  const menuBoxes = [
    {
      id: 1,
      title: "Mealbox",
      description: "Personalized mealboxes for your daily cravings.",
      images: [mlb1, mlb2, mlb3, mlb4, mlb5],
      currentSlide: menuBoxSlides.mealbox,
      link: "/mealboxx",
    },
    {
      id: 2,
      title: "Delivery",
      description: "Fast and fresh delivery, straight to your door.",
      images: [ delbox, dl , dlb ],
      currentSlide: menuBoxSlides.delivery,
      link: "/deliverymenu",
    },
    {
      id: 3,
      title: "Catering",
      description: "Exceptional catering for your special occasions.",
      images: [
        "https://craftmyplate.com/wp-content/uploads/2024/03/Clip-path-group-3.png",
        "https://bellydarbar.in/wp-content/uploads/2024/10/steptodown.com840789-1024x768.jpg",
        "https://elements-resized.envatousercontent.com/envato-shoebox/509b/d10d-c7df-4bac-b7c7-946b64109a35/66a76c92cd07aa052a983dc8_withmeta.jpg?w=1600&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=af1b90b24790f4dc9c07b4fc1007fa421bac93faa119be50cc8ca7f277738732"
      ],
      currentSlide: menuBoxSlides.catering,
      link: "/menu",
    },
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
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-7"
          >
            <br />
            <br />
            <h1 className="text-7xl md:text-6xl font-bold font-[cursive] text-green-600">
              Maha Spice Caterers
            </h1>

           

            {/* Menu Boxes Section */}
            <section className="py-12 px-4 hidden sm:block">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-wrap sm:flex-wrap gap-4 justify-center">
                  {menuBoxes.map((box) => (
                    <motion.div
                      key={box.id}
                      whileHover={{ y: -5 }}
                      className="flex-shrink-0 w-full sm:w-[45%] lg:w-[30%] bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden cursor-pointer"
                      onClick={() => handleKnowMoreClick(box.link)}
                    >
                      <div className="relative w-full h-full aspect-w-1 aspect-h-1 overflow-hidden">
                            {box.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`${box.title} ${index + 1}`}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                                  box.currentSlide === index ? "opacity-100" : "opacity-0"
                                }`}
                              />
                            ))}
                          
                            {/* Fade effect and content */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                            
                           <div className="p-4">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                                  {box.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 mb-4">{box.description}</p>
                                <button
                                  className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-green-600 text-white text-xs sm:text-sm rounded-full hover:bg-green-700 transition"
                                >
                                  Know More
                                </button>
                          </div>
                      </div>

                      
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        </div>

            

        {/* Background Carousel */}
        <div className="absolute inset-0 w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-black/60 z-10" />
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

          {/*       only visible in small devices */}
 
             <section className=" mx-4 my-4 " > 
              <div
                className="hidden md:block lg:block xl:block" // Hidden by default on medium and larger devices
                className="block md:hidden" // Visible on smaller devices
              >
                 
                <div className="flex flex-wrap sm:flex-wrap gap-4 justify-center">
                  {menuBoxes.map((box) => (
                    <motion.div
                      key={box.id}
                      whileHover={{ y: -5 }}
                      className="flex-shrink-0 w-85 sm:w-[45%] lg:w-[30%] bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden cursor-pointer"
                      onClick={() => handleKnowMoreClick(box.link)}
                    >
                      <div className="relative h-60 sm:h-52 overflow-hidden">

                        {box.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`${box.title} ${index + 1}`}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                              box.currentSlide === index ? "opacity-100" : "opacity-0"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                          {box.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-4">{box.description}</p>
                        <button
                          className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-green-600 text-white text-xs sm:text-sm rounded-full hover:bg-green-700 transition"
                        >
                          Know More
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
        </section >


      {/* Services Grid */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-gray-600">
              Comprehensive catering solutions for every occasion
            </p>
          </div>

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
                className="flex flex-col items-center"
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

   
    
