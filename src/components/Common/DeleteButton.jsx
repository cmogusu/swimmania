"use client";

import React, { useCallback, useState } from "react";
import { Loading } from "./Loading";

export const DeleteButton = ({ onDelete }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);

	const deleteItem = useCallback(async () => {
		setIsLoading(true);

		onDelete().then((isSuccessful) => {
			!isSuccessful && setHasError(false);
			setIsLoading(false);
		});
	}, [onDelete]);

	return (
		<button
			className="btn btn-lg btn-danger"
			type="button"
			onClick={deleteItem}
			disabled={isLoading}
		>
			<span>Delete</span>
			<Loading isLoading={isLoading} />
			{hasError && <span>Failed to delete</span>}
		</button>
	);
};

// const deleteEntity = (entityType, id) => {
//   switch (entityType) {
//     case EntityTypes.pool:
//       return api.deletePool(id);
//     case EntityTypes.image:
//       return api.deleteImage(id);
//     case EntityTypes.metadata:
//       return api.deleteMetadata(id);
//     default:
//       return;
//   }
// };
