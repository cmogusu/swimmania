import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { DefaultImage, ImgHeightToWidthRatio } from "@/constants";
import type { MapMetadata } from "@/types";
import { logError } from "@/utilities";
import { RenderMapButton } from "./RenderMapButton";

export const Card = ({ img, title, description, id }: MapMetadata) => {
	if (!title || !description) {
		logError("title or description is not set");
		return "";
	}

	const pageLink = `/map/${id}`;
	const screenshotLink = `/screenshot/${id}`;

	return (
		<div className="card w-full shadow-sm">
			<figure>
				<Image
					src={img.src || DefaultImage.src}
					alt={img.alt || description}
					width={1024}
					height={1024 * ImgHeightToWidthRatio}
				/>
			</figure>
			<div className="card-body">
				<Link href={pageLink}>
					<h2 className="card-title">{title}</h2>
				</Link>
				<p>{description}</p>
				<p>
					<Link href={screenshotLink}>screenshot</Link>
				</p>
				<div className="card-actions justify-end">
					<Suspense fallback={<Link href={pageLink}>view</Link>}>
						<RenderMapButton id={id} />
					</Suspense>
				</div>
			</div>
		</div>
	);
};
