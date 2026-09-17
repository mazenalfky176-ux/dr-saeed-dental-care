import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export const CustomCursor: React.FC = () => {
  const { cursorText } = useApp();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Check if touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, select, textarea, [data-cursor]');
        setIsHovered(!!interactive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const hasCustomText = Boolean(cursorText);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center font-sans"
      animate={{
        x: pos.x,
        y: pos.y,
        translateX: '-50%',
        translateY: '-50%',
      }}
      transition={{
        type: 'spring',
        damping: 28,
        stiffness: 350,
        mass: 0.2,
      }}
    >
      {hasCustomText ? (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="bg-[#D71920] text-white px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-xl flex items-center gap-1.5 whitespace-nowrap"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          {cursorText}
        </motion.div>
      ) : (
        <motion.div
          animate={{
            width: isHovered ? 42 : 12,
            height: isHovered ? 42 : 12,
            borderColor: isHovered ? 'rgba(215, 25, 32, 0.8)' : 'rgba(245, 244, 240, 0.4)',
            backgroundColor: isHovered ? 'rgba(215, 25, 32, 0.15)' : '#D71920',
          }}
          transition={{ duration: 0.18 }}
          className="rounded-full border transition-colors duration-150 backdrop-blur-[1px]"
        />
      )}
    </motion.div>
  );
};
