import React, { useEffect, useRef, useState } from "react";

import "./style.css";
import { createPortal } from "react-dom";

export const DropDownV1 = ({
  options,
  optionCell,
  onChange,
  selectedOption,
}) => {
  const OptionCell = optionCell;
  const wrapper = useRef();
  const listWrapper = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [inset, setInset] = useState({ top: 0, left: 0 });
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const { top, left, height } = wrapper.current.getBoundingClientRect();
    setInset({ top: top + height, left });
  }, []);

  useEffect(() => {
    if(isOpen) setHeight(listWrapper.current.offsetHeight);
  }, [isOpen]);

  const handleToggle = () => {
    if(!isOpen) setIsOpen(true);
    else {
      setHeight(0);
      setTimeout(() => {
        setIsOpen(false)
      }, 230);
    }
  }

  return (
    <>
      <div
        className="drop-down-v1"
        ref={wrapper}
        onClick={handleToggle}
      >
        {optionCell(selectedOption)}
      </div>
      {isOpen
        ? createPortal(
            <div
              className="drop-down-v1-list-wrapper"
              style={{
                position: "absolute",
                left: `${inset.left}px`,
                top: `${inset.top}px`,
                height: `${height}px`,
                transition: "ease-out 200ms height"
              }}
            >
              <div className="drop-down-v1-list" ref={listWrapper}>
                {options.map((option) => {
                  return (
                    <div className="drop-down-v1-option">
                      {optionCell(option, option === selectedOption)}
                    </div>
                  );
                })}
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
};
