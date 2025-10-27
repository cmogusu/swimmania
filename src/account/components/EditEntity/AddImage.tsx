import type { EntityType, ImageData } from "@/server/types";
import { ImageForm } from "./ImageForm";

type Props = {
	entityType: EntityType;
	entityId: number;
};

export const AddImage = ({ entityType, entityId }: Props) => {
	const image = createEmptyImage();

	return (
		<div className="mb-4">
			<h4>Upload</h4>
			<ImageForm entityId={entityId} entityType={entityType} image={image} />
		</div>
	);
};

const createEmptyImage = (): ImageData => ({
	id: -1,
	alt: "",
	src: "",
	isDefault: true,
});
