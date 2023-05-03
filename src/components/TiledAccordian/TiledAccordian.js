import classNames from "classnames";
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Animation } from "../Animation/Animation";

import "./TiledAccordian.css";

const TiledAccordian = ({ items }) => {
  const wrapper = useRef();
  const [expanded, setExpanded] = useState(false);
  const [closing, setClosing] = useState(false);
  const [style, setStyle] = useState(null);

  useEffect(() => {
    const dim = wrapper.current.getBoundingClientRect();
    const top = dim.top + dim.height;
    const left = dim.left;
    setStyle({ top: top, left: left });
  }, []);

  const handleToggle = () => {
    if (!expanded) setExpanded(true);
    else {
      setClosing(true);
      setTimeout(() => {
        setExpanded(false);
        setClosing(false);
      }, 250);
    }
  };

  const renderedItems = items.map((item, index) => {
    return <Animation show={expanded} delay={index}><div className="item"></div></Animation>;
  });

  return (
    <>
      <div
        className="tiled-accordian-wrapper"
        ref={wrapper}
        onClick={handleToggle}
      ></div>
      {expanded
        ? ReactDOM.createPortal(
            <div
              className={classNames(
                "tiled-accordian-items",
                closing ? "closing" : null
              )}
              style={style}
            >
              {renderedItems}
            </div>,
            document.body
          )
        : null}
    </>
  );
};
export { TiledAccordian };
