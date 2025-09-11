import React, { useCallback } from 'react';
import { Rate } from 'antd';

const RatingsText = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

export const RatingsInput = ({ name, value, onChange }) => {
  const _onChange = useCallback(
    (newValue) => {
      onChange(name, newValue);
    },
    [onChange],
  );

  return (
    <Rate
      tooltips={RatingsText}
      value={value}
      onChange={_onChange}
    />
  );
};
