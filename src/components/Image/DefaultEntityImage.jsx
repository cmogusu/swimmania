import React from 'react';
import { DefaultImage } from '../../constants';
import { getImage } from './utils';

export const DefaultEntityImage = (props) => {
  const { entityId, entityType } = props;
  const { image } = getImage(props, entityType, entityId, 'default');
  const { description, src} = image?.src
    ? image
    : DefaultImage

  return (
    <figure className="rounded">
      <img className="img-fluid" alt={description} src={src} />
    </figure>
  );
};

