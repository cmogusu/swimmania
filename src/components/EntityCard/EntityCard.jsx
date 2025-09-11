"use client";

import React, { useCallback, useState } from "react";
import { DefaultImage } from "../../constants";
import { shortenText } from "../../utilities";
import "./style.css";

export const EntityCard = (props) => {
	const { entity } = props;
	const shortDescription = shortenText(entity?.description, 25);
	const image = entity.images?.[0] || DefaultImage;
	const [isClicked, setIsClicked] = useState(false);

	const onClick = useCallback(() => {
		if (!props.onClick) {
			return;
		}

		setIsClicked((isClicked) => {
			props.onClick(entity);
			return !isClicked;
		});
	}, [props.onClick, entity]);

	return (
		<div
			className={`card bg-base-100 shadow-sm ${isClicked ? "clicked" : ""}`}
			onClick={onClick}
		>
			<figure className="rounded">
				<img className="img-fluid" src={image.src} />
			</figure>
			<div className="card-body">
				<h4 className="card-title">{entity.name}</h4>
				<p className="card-text">{shortDescription}</p>
			</div>
		</div>
	);
};
