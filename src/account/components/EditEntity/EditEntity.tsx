import { api, type EntityType, updateEntity } from "@/server";

import { EditImages } from "./EditImages";

// import { EditMetadata } from "./EditMetadata";

type Props = {
	entityType: EntityType;
	entityId: number;
};

export const EditEntity = async ({ entityType, entityId }: Props) => {
	const entity = await api.getEntity(entityType, entityId);
	// const entity = getEntity(entityId);
	const { id, name, location, description, images, metadata } = entity || {};

	// TODO: fetch path from next
	const currentPath = `/account/${entityType}/${entityId}/edit`;

	if (!entity || !id) {
		return "Oops, item not found";
	}

	return (
		<div>
			<section>
				<form action={updateEntity}>
					<input type="hidden" name="entityType" defaultValue={entityType} />
					<input type="hidden" name="entityId" defaultValue={id} />
					<input type="hidden" name="currentPath" defaultValue={currentPath} />

					<h1 className="mb-4">Edit: {name}</h1>

					<label className="floating-label mb-3">
						<span>name</span>
						<input
							className="input input-sm"
							type="text"
							name="name"
							placeholder="name"
							defaultValue={name}
						/>
					</label>

					<label className="floating-label mb-3">
						<span>location</span>
						<input
							className="input input-sm"
							type="text"
							name="location"
							defaultValue={location}
						/>
					</label>

					<label className="floating-label mb-3">
						<span>Description</span>
						<textarea
							className="textarea textarea-sm"
							name="description"
							defaultValue={description}
						/>
					</label>
					<button className="btn btn-sm" type="submit">
						Update
					</button>
				</form>
			</section>

			<EditImages entityId={id} images={images} currentPath={currentPath} />
			{/* <EditMetadata entityType={entityType} metadata={metadata} /> */}
		</div>
	);
};

const getEntity = (entityId: number) => ({
	id: entityId,
	type: "pool",
	name: "name 2",
	description: "description chicken layer",
	location: "kiambu tw",
	defaultImage: {
		id: 2,
		alt: "image2 description",
		src: "/images/pool-453.jpg",
	},
	images: [
		{
			id: 1,
			alt: "image1 descrpt",
			src: "/images/pool-1249.jpg",
			isDefault: false,
		},
		{
			id: 2,
			alt: "image2 description",
			src: "/images/pool-453.jpg",
			isDefault: false,
		},
		{ id: 3, alt: "descrpt", src: "/images/pool-2650.jpg", isDefault: false },
		{
			id: 4,
			alt: "image 4 description againsted",
			src: "/images/pool-5358.jpg",
			isDefault: false,
		},
		{ id: 5, alt: "desc", src: "/images/pool-3867287.jpg", isDefault: false },
	],
	metadata: [
		{ id: 13, name: "poolDimensions.length", value: 25 },
		{ id: 24, name: "operatingHours.closing", value: 24480000 },
		{ id: 25, name: "hasLaneRopes", value: true },
		{ id: 26, name: "isHeated", value: true },
		{ id: 28, name: "cleanliness", value: 4 },
		{ id: 29, name: "hasOnDutyLifeguard", value: true },
		{ id: 14, name: "location.lat", value: -1.2611664809506706 },
		{ id: 15, name: "location.lng", value: 36.80447787409544 },
	],
});
