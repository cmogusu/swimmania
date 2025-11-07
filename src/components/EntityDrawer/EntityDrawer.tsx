"use client";

import Image from "next/image";
import { DefaultSiteImage } from "@/constants";
import {
	EntityContextProvider,
	useEntityDrawerContext,
	useSelectedEntityContext,
} from "@/context";

export const EntityDrawer = () => {
	const { toggleDrawer } = useEntityDrawerContext();
	const { entity } = useSelectedEntityContext();
	const { name, description, defaultImage } = entity || {};
	const image = defaultImage || DefaultSiteImage;

	if (!entity) {
		return null;
	}

	return (
		<div className="">
			<EntityContextProvider
				entityId={entity.entityId}
				entityType={entity.type}
			>
				<section className="mb-4">
					<h1>{name}</h1>
					<hr className="w-50 mb-4" />
					<div className="mb-4">
						<Image
							alt={image.alt}
							className="size-10 rounded-box"
							width={1000}
							height={667}
							src={image.src}
						/>
					</div>

					<p className="text-2xl">{description}</p>
				</section>
			</EntityContextProvider>

			<button
				type="button"
				onClick={toggleDrawer}
				className="drawer-button btn btn-primary"
			>
				Close drawer
			</button>
		</div>
	);
};
