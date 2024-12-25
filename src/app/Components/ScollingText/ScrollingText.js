import React, { useEffect, useState } from 'react';
import './ScrollingText.css';

const ScrollingText = () => {
  const firstLine = "- beyond boundaries - beyond boundaries ".repeat(30).trim();
  const secondLine = "- venture beyond the digital horizon ".repeat(30).trim();

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="scrolling-text-container">
      <div className="scrolling-text">
        <p
          className="scroll-right"
          style={{ transform: `translateX(${cursorPos.x * 0.1}px)` }}
        >
          {firstLine}
        </p>
      </div>
      <div className="scrolling-text">
        <p
          className="scroll-left"
          style={{ transform: `translateX(${-cursorPos.x * 0.1}px)` }}
        >
          {secondLine}
        </p>
      </div>
    </div>
  );
};

export default ScrollingText;
