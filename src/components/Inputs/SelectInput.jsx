import React, { useCallback } from "react";
import "./style.css";

export const SelectInput = ({ name, options, value, onChange }) => {
  const _onChange = useCallback(
    (event) => {
      const { value } = event.target;
      onChange(name, value);
    },
    [onChange]
  );

  return (
    <select className="w-100" name={name} value={value} onChange={_onChange}>
      {options.map((option) => (
        <option key={option.name} value={option.name}>
          {option.title}
        </option>
      ))}
    </select>
  );
};
