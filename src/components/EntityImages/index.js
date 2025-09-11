import { Image } from "antd";
import React, { useCallback, useEffect, useState } from "react";
// import { DeleteButton } from '../Common';
import { BaseImageUploadUrl, DefaultImage, EntityTypes } from "../../constants";
import { useAdminContext } from "../../context/adminContext";
import { getEntityImages } from "../../utilities/api";
import { Loading } from "../Common";
import { UploadImage } from "./UploadImage";

export const EntityImages = ({ entityId }) => {
	const { isEditingEnabled } = useAdminContext();
	const { isLoading, images, reloadImages } = useLoadImages(entityId);
	const uploadUrl = `${BaseImageUploadUrl}/${entityId}`;

	if (isLoading) {
		return <Loading isLoading={isLoading} />;
	}

	return (
		<div>
			{isLoading && (
				<div className="alert alert-success" role="alert">
					Loading...
				</div>
			)}
			<div>
				{!images || images.length === 0 ? (
					<Image src={DefaultImage.src} />
				) : (
					<Image.PreviewGroup>
						{images.map((image) => (
							<div key={image.id}>
								<Image src={image.src} fallback={DefaultImage.src} />
								{/* <DeleteButton id={image.id} entityType={EntityTypes.image} onComplete={reloadImages} /> */}
							</div>
						))}
					</Image.PreviewGroup>
				)}
			</div>

			{isEditingEnabled && (
				<UploadImage uploadUrl={uploadUrl} onComplete={reloadImages} />
			)}
		</div>
	);
};

const useLoadImages = (entityId) => {
	const [images, setImages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const loadImages = useCallback(() => {
		setIsLoading(true);
		getEntityImages(entityId).then((images) => {
			images?.length && setImages(images);
			setIsLoading(false);
		});
	}, []);

	useEffect(() => {
		loadImages();
	}, [entityId]);

	return { isLoading, images, reloadImages: loadImages };
};
