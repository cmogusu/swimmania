import React, { useCallback } from 'react';
import './style.css';

export const TextInput = ({ name, placeholder, type, value, onChange }) => {
  const _onChange = useCallback(
    (event) => {
      const { value } = event.target;
      onChange(name, value);
    },
    [onChange],
  );

  return (
    <input
      className="w-100"
      name={name || ''}
      placeholder={placeholder || ''}
      type={type || "text"}
      value={value ?? ""}
      onChange={_onChange} />
  );
};
