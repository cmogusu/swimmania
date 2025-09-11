"use client";

import { Image as AntImage } from "antd";
import { useCallback, useState } from "react";
import { DefaultImage } from "../../constants";

export const Images = ({ images }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const handleOnClick = useCallback(
		(event) => {
			const currentIndex = parseInt(event.target.dataset.index, 10);
			setCurrentImageIndex(currentIndex);
		},
		[images],
	);

	if (!images?.length) {
		return <AntImage src={DefaultImage.src} />;
	}

	const currentImage = images[currentImageIndex];

	return (
		<div className="mb-3">
			<div className="mb-1">
				<AntImage src={currentImage.src} />
			</div>

			<div className="flex w-100">
				{images.map((image, imageIndex) => (
					<img
						alt={image.description}
						className="m-1"
						data-index={imageIndex}
						key={image.id}
						src={image.src}
						width="100px"
						onClick={handleOnClick}
					/>
				))}
			</div>
		</div>
	);
};
