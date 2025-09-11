import React from 'react';
import { shortenText } from '../../utilities';
import { DefaultImage } from '../../constants';

export const EntityCard = ({ entity }) => {
  const shortDescription = shortenText(entity?.description, 25);
  const image = entity.images?.[0] || DefaultImage;

  return (
    <div className="col-12 col-md-6 mb-3">
      <div className="entity-card card">
        <img className="img-fluid" src={image.src} />
        <div className="card-body">
          <h4 className="card-title">{entity.name}</h4>
          <p className="card-text">{shortDescription}</p>
        </div>
      </div>
    </div>
  );
};
