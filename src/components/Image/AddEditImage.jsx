"use client";

import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Link } from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { api } from "../../utilities";
import { Loading } from "../Common";
import { TextAreaInput, TextInput } from "../Inputs";
import { UploadImage } from "./UploadImage";
import { getImage, getImages } from "./utils";

export const AddEditImage = (props) => {
	const { entityType, entityId, imageId } = props;
	const { images, reload: reloadImages } = getImages(entityType, entityId);
	const { isLoading, image, reloadImage } = getImage(
		props,
		entityType,
		entityId,
		imageId,
	);

	const onCompleteUpdate = useCallback(() => {
		reloadImage();
		reloadImages();
	}, [reloadImage, reloadImages]);

	const { editedImage, isEdited, isUpdated, onChange, onFileUpload, onSubmit } =
		usePrepareEdit(entityType, entityId, image, onCompleteUpdate);

	const addEditLink = imageId
		? `/edit/${entityType}/${entityId}/image/${imageId}`
		: `/add/${entityType}/${entityId}/image`;

	return (
		<div>
			<div className="flex">
				{images?.map((image) => (
					<EditWrapper
						entityType={entityType}
						entityId={entityId}
						imageId={image.id}
						key={image.id}
						reloadImages={reloadImages}
					>
						<img
							alt={image.description}
							className="m-1"
							src={image.src}
							width="100px"
						/>
					</EditWrapper>
				))}
			</div>

			<h3>{image?.id ? "Update" : "Add new"} image</h3>

			<UploadImage onFileUpload={onFileUpload} />

			<div className="grid grid-cols-6 gap-3 mb-1">
				<div className="">Name:</div>
				<div className="">
					<TextInput
						name="name"
						placeholder="Name"
						value={editedImage?.name}
						onChange={onChange}
					/>
				</div>
			</div>

			<div className="grid grid-cols-6 gap-3 mb-1">
				<div className="">Description:</div>
				<div className="">
					<TextAreaInput
						name="description"
						placeholder="Description"
						value={editedImage?.description}
						onChange={onChange}
					/>
				</div>
			</div>

			<div className="grid grid-cols-12 gap-3">
				<div className="">
					<button
						type="button"
						className="btn btn-primary btn-lg"
						disabled={!isEdited}
						onClick={onSubmit}
					>
						Submit
					</button>
					{isUpdated && <span style={{ color: "green" }}>updated</span>}
					&nbsp;
					{entityId && (
						<Link href={addEditLink}>
							{imageId ? "Update" : "Add new"} image
						</Link>
					)}
				</div>
			</div>

			<Loading isLoading={isLoading} />
		</div>
	);
};

const usePrepareEdit = (entityType, entityId, image, onCompleteUpdate) => {
	const [editedImage, setEditedImage] = useState(image || {});
	const [isEdited, setIsEdited] = useState(false);
	const [isUpdated, setIsUpdated] = useState(false);
	const [file, setFile] = useState();

	const onFileUpload = useCallback((uploadedFile) => {
		setFile(uploadedFile);
		setIsEdited(true);
	}, []);

	const onChange = useCallback(
		(propName, value) => {
			setEditedImage({ ...editedImage, [propName]: value });
			setIsEdited(true);
		},
		[editedImage],
	);

	const onSubmit = useCallback(() => {
		const formData = new FormData();
		formData.append("id", editedImage.id);
		formData.append("name", editedImage.name);
		formData.append("description", editedImage.description);
		file && formData.append("file", file, file.name);

		api.updateImage(entityType, entityId, editedImage.id, formData).then(() => {
			setIsEdited(false);
			setIsUpdated(true);
			setIsUpdated(false);

			if (editedImage.id) {
				onCompleteUpdate();
			}
		});
	}, [editedImage, entityId, entityType, file, onCompleteUpdate]);

	useEffect(() => {
		image && setEditedImage(image);
	}, [image]);

	return { editedImage, isEdited, isUpdated, onChange, onFileUpload, onSubmit };
};

const EditWrapper = ({
	entityType,
	entityId,
	imageId,
	reloadImages,
	children,
}) => {
	const onDeleteEntity = useCallback(() => {
		if ((entityType && entityId, imageId)) {
			api.deleteImage(entityType, entityId, imageId).then(reloadImages);
		}
	}, [entityType, entityId, reloadImages]);

	return (
		<div className="position-relative">
			<div className="position-absolute edit-wrappper">
				<Link href={`/edit/${entityType}/${entityId}/image/${imageId}`}>
					<EditFilled />
				</Link>

				<DeleteFilled onClick={onDeleteEntity} />
			</div>

			{children}
		</div>
	);
};
