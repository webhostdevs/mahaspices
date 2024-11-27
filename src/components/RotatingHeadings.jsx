import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RotatingHeadings = () => {
  const headings = [
    "Maintaining Food Safety & Hygiene and we serve all type of catering services",
    "ISO 22000:1800 safety management certification",
    "We serve hygiene and safe food for all celebrations"
  ];

  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadingIndex((prevIndex) => 
        (prevIndex + 1) % headings.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h3
          key={currentHeadingIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute text-lg sm:text-xl font-bold mb-2 w-full text-center"
        >
          {headings[currentHeadingIndex]}
        </motion.h3>
      </AnimatePresence>
    </div>
  );
};

export default RotatingHeadings;
