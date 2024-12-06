import React from 'react';
import { motion } from 'framer-motion';

function PageWrapper({ children }) {
  return (
   <>
    <motion.div
      className="page-wrapper"
    //   initial={{ y:"100%" }}
    //   animate={{ y:"0%"}}
    //   exit={{ opacity: 1 }}
    //   transition={{
    //     duration: 0.75,
    //     ease: "easeOut",
    //   }}
    >
      <div className="blur-background" />
      {children}
    </motion.div>
    <motion.div
    className='slide-in'
    initial={{ scaleY:0 }}
      animate={{ scaleY:0}}
      exit={{ scaleY: 1 }}
      transition={{
        duration: 0.5,
        ease:[0.22,1,0.36,1]
      }}
    
    >
        
    </motion.div>

    <motion.div
    className='slide-out'
    initial={{ scaleY:1 }}
      animate={{ scaleY:0}}
      exit={{ scaleY: 0 }}
      transition={{
        duration:0.5,
        ease:[0.22,1,0.36,1]
      }}
    
    >
        
    </motion.div>
   </>
  );
}

export default PageWrapper;
