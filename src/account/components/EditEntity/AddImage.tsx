import type { ImageData } from "@/server";
import { insertImage } from "@/server";
import { ImageForm } from "./ImageForm";

type Props = {
	entityId: number;
};

export const AddImage = ({ entityId }: Props) => {
	const image = createEmptyImage();

	return (
		<div className="mb-4">
			<h4>Upload</h4>
			<ImageForm entityId={entityId} image={image} action={insertImage} />
		</div>
	);
};

const createEmptyImage = (): ImageData => ({
	id: -1,
	alt: "",
	src: "",
	isDefault: true,
});
