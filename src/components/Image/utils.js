"use client";

import { useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import { api, splitUrl } from "../../utilities";

export const getImageId = (match) => {
	if (match?.params?.imageId) {
		return match.params.metadataId;
	}

	const context = useGlobalContext();
	if (context.currentImageId) {
		return context.currentImageId;
	}

	// eslint-disable-next-line no-undef
	const pathName = global.location?.pathname || "";
	const splitPathName = pathName
		.split("/")
		.filter((v) => !!v && !["edit", "add"].includes(v));
	return splitPathName[3];
};

export const getRelatedEntityType = () => splitUrl().relatedEntityType;

export const getImage = (props, entityType, entityId, imageId) => {
	const [image, setImage] = useState(props.image || {});
	const [isLoading, setIsLoading] = useState(false);

	const loadImage = useCallback(() => {
		if (!entityType || !entityId || !imageId) {
			return;
		}

		setIsLoading(true);
		api.getImageById(entityType, entityId, imageId).then((fetchedImage) => {
			fetchedImage?.id && setImage(fetchedImage);
			setIsLoading(false);
		});
	}, [entityType, entityId, imageId]);

	useEffect(() => {
		if (!props.image) {
			loadImage();
		}
	}, [props.image, loadImage, imageId, entityId]);

	return { isLoading, image, reloadImage: loadImage };
};

export const getImages = (entityType, entityId) => {
	const [images, setImages] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const loadImages = useCallback(() => {
		if (!entityType || !entityId) {
			return;
		}

		setIsLoading(true);
		api.getImages(entityType, entityId).then((fetchedImages) => {
			fetchedImages?.length && setImages(fetchedImages);
			setIsLoading(false);
		});
	}, [entityType, entityId]);

	useEffect(() => {
		loadImages();
	}, [loadImages, entityId]);

	return { isLoading, images, reload: loadImages };
};
