"use client";

import Image from "next/image";
import { useSelectedEntityContext } from "@/front/context";

export const MapItem = () => {
	const { entity } = useSelectedEntityContext();

	return (
		<div>
			{entity && <h3>{entity.name}</h3>}
			<Image
				className="w-full"
				src="/images/map-placeholder.jpeg"
				alt="MapGuru logo"
				height={20}
				width={70}
			/>
		</div>
	);
};
