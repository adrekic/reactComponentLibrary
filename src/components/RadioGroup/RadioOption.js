import React, { useContext } from "react";
import classNames from "classnames";

import { RadioGroupContext } from "./RadioGroup";

import "./RadioGroup.css";

export const RadioOption = ({ item, children, className }) => {
  const { selected, onSelectChange } = useContext(RadioGroupContext);
  console.log(children)
  return (
    <div
      className={classNames("radio-group-option", className)}
      onClick={() => onSelectChange(item)}
    >
      {children(selected === item)}
    </div>
  );
};
