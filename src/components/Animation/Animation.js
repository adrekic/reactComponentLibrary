import React, { useEffect, useState } from "react";
import cn from "classnames";

const Animation = ({ children, show, delay }) => {
  const [render, setRender] = useState(false);
  const [className, setClassName] = useState(null);

  useEffect(() => {
    if (show) {
      setClassName("rendering");
      setRender(true);
      setTimeout(() => {
        setClassName(null);
      }, delay);
    } else {
      setClassName("derendering");
      setTimeout(() => {
        setClassName(null);
        setRender(false);
      }, delay);
    }
  }, [show]);
  return (
    <>
      {render
        ? React.cloneElement(children, {
            ...children.props,
            className: className
              ? cn(children.props.className, className)
              : children.props.className,
          })
        : null}
    </>
  );
};

export { Animation };
