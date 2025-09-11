import React, { useCallback } from 'react';
import { api } from '../../utilities';
import { DeleteButton as DeleteItemButton } from '../Common'

export const DeleteButton = ({ entityId, entityType }) => {
  const deleteFn = useCallback(() => 
    api.deleteEntity(entityType, entityId).then(() => {
      global.location.href = `${global.location.origin}/${entityType}`;
    }), [entityType, entityId]);

  return (
    <DeleteItemButton onDelete={deleteFn} />
  )
};