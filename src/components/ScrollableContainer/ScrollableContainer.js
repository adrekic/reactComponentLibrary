import React, { useRef, useState } from "react";
import classNames from "classnames";

import "./ScrollableContainer.css";

export const ScrollableContainer = ({ children, hideScrollBar = false }) => {
  const wrapper = useRef();
  const interval = useRef();
  const [isMouseDown, setIsMouseDown] = useState(false);

  const resetInterval = () => {
    if (interval.current) clearInterval(interval.current);
  };

  const handleMouseUp = (e) => {
    setIsMouseDown(false);
    resetInterval();
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseOver = (e) => {
    if (isMouseDown) {
      resetInterval();
      const { top, bottom, height } = wrapper.current.getBoundingClientRect();

      if (top <= e.clientY && e.clientY <= top + height * 0.2) {
        interval.current = setInterval(() => {
          const rate = Math.min(2 ** (10 / (e.clientY - top)), 3);
          wrapper.current.scrollTop = wrapper.current.scrollTop - rate;
        }, 0);
      } else if (bottom - height * 0.2 <= e.clientY && e.clientY <= bottom) {
        interval.current = setInterval(() => {
          const rate = Math.min(2 ** (10 / (bottom - e.clientY)), 3);
          wrapper.current.scrollTop = wrapper.current.scrollTop + rate;
        }, 0);
      }
    }
  };

  return (
    <div
      draggable={false}
      ref={wrapper}
      className={classNames({
        "scrollable-container": true,
        "hide-scroll-bar": hideScrollBar,
      })}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseOver}
      onMouseLeave={() => resetInterval()}
    >
      {children}
    </div>
  );
};
