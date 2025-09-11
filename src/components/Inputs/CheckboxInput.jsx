import React, { useCallback } from 'react';
import { Checkbox } from 'antd';

export const CheckboxInput = ({ name, options, value, onChange }) => {
  const _onChange = useCallback(
      (newValue) => {
        onChange(name, newValue);
      },
      [onChange],
    );

  return (
    <Checkbox.Group value={value} onChange={_onChange}>
      {options.map((option) => (
        <Checkbox key={option.name} value={option.name}>
          {option.title}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
};
