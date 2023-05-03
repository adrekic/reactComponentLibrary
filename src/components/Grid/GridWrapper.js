import React from "react";

import "./GridWrapper.css";

const GridWrapper = ({ children, style = null }) => {
  return (
    <div className="grid-wrapper" style={style}>
      {children}
    </div>
  );
};

const GridItem = ({ children, style = null }) => {
  return (
    <div className="grid-item" style={style}>
      {children}
    </div>
  );
};

export { GridWrapper, GridItem };
