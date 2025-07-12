import React from 'react';
import { motion } from 'framer-motion';

export const FloatingElements = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Blue ellipse */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ top: '10%', right: '5%' }}
      />
      
      {/* Purple ellipse */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 70, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
        style={{ top: '30%', left: '5%' }}
      />
      
      {/* Indigo ellipse */}
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl"
        animate={{
          x: [0, 80, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
        style={{ bottom: '20%', right: '15%' }}
      />

      {/* Small particles */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-blue-400/50"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={{ top: '25%', left: '45%' }}
      />
      
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-indigo-400/50"
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
          delay: 1,
        }}
        style={{ top: '65%', right: '25%' }}
      />
      
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-purple-400/50"
        animate={{
          x: [0, 40, 0],
          y: [0, 40, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "loop",
          delay: 2,
        }}
        style={{ bottom: '15%', left: '35%' }}
      />
    </div>
  );
};
