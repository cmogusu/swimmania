import Image from "next/image";

export const MapBackground = () => {
	return (
		<div className="absolute top-0 bottom-0 left-0 right-0 z-10">
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
