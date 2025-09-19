import Image from "next/image";

export const MapItem = () => {
	return (
		<div>
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
