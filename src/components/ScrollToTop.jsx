// src/components/ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation(); // Hook that tracks the current route
  
  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll to the top when the route changes
  }, [location]); // Dependency on location changes (i.e., when the route changes)
  
  return null;  // No need to render anything on the page
};

export default ScrollToTop;
