import React, { useCallback } from 'react';
import './style.css';

export const TextAreaInput = ({ name, placeholder, value, onChange }) => {
  const _onChange = useCallback(
    (event) => {
      const { value } = event.target;
      onChange(name, value);
    },
    [onChange],
  );

  return (
    <textarea className="w-100" name={name} placeholder={placeholder} value={value ?? ''} onChange={_onChange} />
  );
};
