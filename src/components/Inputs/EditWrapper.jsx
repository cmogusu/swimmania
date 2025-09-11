import React, { useState, useCallback } from 'react';
import './style.css';

export const EditWrapper = (props) => {
  const { render } = props;
  const [isEditing, setIsEditing] = useState(false);

  const onEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const onSubmit = useCallback(() => {
    setIsEditing(false);
    props.onSubmit();
  }, [props.onSubmit]);

  return (
    <span>
      {render && render(isEditing)}
      {isEditing ? (
        <button className="btn btn-dark" onClick={onSubmit}>
          save
        </button>
      ) : (
        <button className="btn btn-dark" onClick={onEdit}>
          edit
        </button>
      )}
    </span>
  );
};
