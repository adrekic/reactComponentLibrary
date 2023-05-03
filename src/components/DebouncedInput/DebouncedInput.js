import React, { useEffect, useState, useRef } from "react";

import "./DebouncedInput.css";

const DebouncedInput = ({
  label,
  value,
  onChange,
  timeout = 3000,
  disabled = false,
  placeholder,
}) => {
  let timer = useRef();
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      onChange(debouncedValue);
    }, timeout);
  }, [debouncedValue]);

  return (
    <div className="input-wrapper">
      {label ? (
        <div className="input-label">
          <label>{label}</label>
        </div>
      ) : null}
      <input
        className="input-field"
        disabled={disabled}
        value={debouncedValue}
        onChange={(e) => setDebouncedValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default DebouncedInput;
