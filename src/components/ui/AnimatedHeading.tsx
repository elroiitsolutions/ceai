"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  elementType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  delay?: number;
}

import { MotionValue } from "framer-motion";

const Character = ({ char, progress, range }: { char: string, progress: MotionValue<number>, range: number[] }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }}>
      {char}
    </motion.span>
  );
};

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({ 
  text, 
  className = "", 
  elementType: Element = 'h2',
  delay = 0
}) => {
  const container = React.useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 90%", "end 60%"]
  });

  const words = text.split(" ");
  let charCount = 0;
  const totalChars = words.reduce((acc, word) => acc + word.length, 0);

  return (
    <Element className={className} ref={container as any}>
      <span className="block" style={{ textAlign: 'inherit' }}>
        {words.map((word, i) => {
          if (word === "\n") {
            return <span key={i} className="basis-full h-0 block"></span>;
          }
          return (
            <span key={i} className="inline-block mr-[0.25em]">
              {word.split("").map((char, j) => {
                const start = charCount / (totalChars + 0.5);
                // Add a small overlap (1.5) for a smoother sweep effect
                const end = start + (1.5 / (totalChars + 0.5));
                charCount++;
                
                return (
                  <Character 
                    key={j} 
                    char={char} 
                    progress={scrollYProgress} 
                    range={[start, end]} 
                  />
                );
              })}
            </span>
          );
        })}
      </span>
    </Element>
  );
};

export default AnimatedHeading;
