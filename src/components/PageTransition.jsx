import React from 'react';


const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }} // Starts slightly lower and smaller
      animate={{ opacity: 1, y: 0, scale: 1 }}     // Floats up to normal
      exit={{ opacity: 0, y: -20, scale: 0.98 }}   // Floats up and fades out
      transition={{ duration: 0.4, ease: "easeOut" }} // Smooth timing
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;