import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

const COUNTER_STEPS = ['00', '18', '36', '54', '72', '89', '100'];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Progress through the exact steps
    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < COUNTER_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 600);
          }, 200);
          return prev;
        }
      });
    }, 180);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', opacity: 0.95 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] bg-[#0B0B0B] flex flex-col justify-between p-8 md:p-16 text-[#F5F4F0] select-none"
        >
          {/* Top metadata */}
          <div className="flex justify-between items-center text-xs tracking-widest text-[#A8A8A8] uppercase font-mono">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D71920] animate-ping inline-block" />
              DR. SAEED ELMAGHLANY
            </span>
            <span>CLINICAL ARCHITECTURE</span>
          </div>

          {/* Center typography */}
          <div className="my-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-1 md:space-y-2"
            >
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-[0.88] text-white">
                DR.<br />
                SAEED<br />
                ELMAGHLANY
              </h1>
              <div className="pt-4 flex items-center gap-4">
                <span className="text-sm md:text-base tracking-[0.3em] font-semibold text-[#A8A8A8]">
                  DENTAL CARE
                </span>
                <div className="h-[1px] flex-1 bg-[#171717] relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-[#D71920]"
                    initial={{ x: '-100%' }}
                    animate={{ x: `${(stepIndex / (COUNTER_STEPS.length - 1)) * 100 - 100}%` }}
                    transition={{ ease: 'easeOut', duration: 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom counter & progress */}
          <div className="flex items-end justify-between border-t border-[#171717] pt-6">
            <div className="text-xs text-[#A8A8A8] max-w-xs hidden sm:block">
              Precise restorative dentistry & bespoke smile architecture.
            </div>
            <div className="text-4xl md:text-6xl font-mono font-bold text-white tracking-tight flex items-baseline">
              <span>{COUNTER_STEPS[stepIndex]}</span>
              <span className="text-xs text-[#D71920] font-sans ml-1 font-normal">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
