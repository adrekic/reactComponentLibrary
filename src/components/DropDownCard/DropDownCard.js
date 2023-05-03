import React, { useEffect, useState, useRef } from "react";
import reactDom from "react-dom";
import classNames from "classnames";

import "./DropDownCard.css";

export const DropDownCard = ({ toggleButton, children }) => {
  const [show, setShow] = useState(false);
  const [inset, setInset] = useState({
    top: 0,
    left: 0,
  });
  const toggleButtonRef = useRef(null);

  useEffect(() => {
    const { bottom, left } = toggleButtonRef.current.getBoundingClientRect();
    setInset({ top: bottom, left: left });
    console.log(top, left);
  }, []);

  const handleMouseOver = () => {
    setShow(true);
  };

  const handMouseLeave = () => {
    setShow(false);
  };

  return (
    <>
      <div
        className="toggle-button"
        onMouseOver={handleMouseOver}
        onMouseLeave={handMouseLeave}
        ref={toggleButtonRef}
      >
        {toggleButton}
      </div>
      {reactDom.createPortal(
        <div
          className={classNames({
            "content-wrapper": true,
            visible: show,
          })}
          style={{
            top: `${inset.top}px`,
            left: `${inset.left}px`,
          }}
          onMouseOver={handleMouseOver}
          onMouseLeave={handMouseLeave}
        >
          {children}
        </div>,
        document.body
      )}
    </>
  );
};
