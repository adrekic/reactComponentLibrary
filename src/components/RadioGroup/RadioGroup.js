import React, { createContext, useContext } from "react";
import classNames from "classnames";

import "./RadioGroup.css";

export const RadioGroupContext = createContext();

export const RadioGroup = ({
  selected,
  onSelectChange,
  children,
  className,
}) => {
  return (
    <div className={classNames("radio-group-wrapper", className)}>
      <RadioGroupContext.Provider value={{ selected, onSelectChange }}>
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
};
