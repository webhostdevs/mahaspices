import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Menu as MenuIcon, X, ChevronDown } from 'lucide-react';
import Logo from "../assets/1.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Menu', path: '/menu' },
    { title: 'Services', path: '/services' },
    { title: 'Contact', path: '/contact' },
    { title: 'admin', path: '/admin' },
    { title: 'Category', path: '/category' },
  ];

  return (
    <div className={`transition-all duration-300`}>
      {/* Top contact bar */}
      <div className="bg-green-600 text-white py-2 px-4">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-2">
              <Phone size={18} />
              <span className="text-md">040-2222 8888 / 969779 8888</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className={`bg-white transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src={Logo} alt="Maha Spice Logo" className="h-14 w-auto" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => (
                <div key={item.title} className="relative group">
                  <Link
                    to={item.path}
                    className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
              <Link
                to="/"
                className="ml-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                Login
              </Link>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-green-50 transition-colors"
            >
              {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white`}>
          <div className="px-4 py-2 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
              >
                {item.title}
              </Link>
            ))}
            <Link
              to="/"
              className="block w-full text-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
