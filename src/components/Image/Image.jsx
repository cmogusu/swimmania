import React from 'react';
import { Image as AntImage } from 'antd';
import { DefaultImage } from '../../constants';
import { useGetEntityId } from '../../utilities';
import { Loading } from '../Common';
import { getImage, getImageId } from './utils';

export const Image = (props) => {
  const { entityType, match } = props;
  const entityId = props.entityId || useGetEntityId(match);
  const imageId = props.imageId || getImageId(match);
  const { isLoading, image } = getImage(props, entityType, entityId, imageId);

  if (!image){ 
    return null;
  }

  return (
    <div className="p-2">
      <AntImage src={DefaultImage.src} />
      <p>{image.name}</p>
      <p>{image.description}</p>
      <p>{image.filepath}</p>

      <Loading isLoading={isLoading} />
    </div>
  );
};

