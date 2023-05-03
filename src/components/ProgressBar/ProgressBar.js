import React, { useEffect, useRef, useState } from "react";

import "./ProgressBar.css";

export const ProgressBar = ({ progress = 0, duration }) => {
  const wrapper = useRef();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(wrapper.current.clientWidth * progress);
  }, [progress]);

  return (
    <div className="progress-bar" ref={wrapper}>
      <div
        className="progress"
        style={{ width: `${width}px`, transitionDuration: `${duration}ms` }}
      ></div>
    </div>
  );
};
