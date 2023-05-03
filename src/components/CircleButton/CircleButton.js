import React, { useEffect, useRef } from "react";

import "./CircleButton.css";

const CircleButton = ({
  id = null,
  children,
  width,
  height,
  style = null,
  onClick,
}) => {
  const wrapper = useRef();

  useEffect(() => {
    if(width) wrapper.current.style.setProperty('--circle-button-width', width);
    if(height) wrapper.current.style.setProperty('--circle-button-height', height);
  }, []);

  return (
    <div
      id={id}
      className="circle-button"
      ref={wrapper}
      style={style}
      role="button"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export { CircleButton };
