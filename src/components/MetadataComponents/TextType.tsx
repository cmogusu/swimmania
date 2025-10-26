import { isUndefined } from "@/server/utils";
import type { MetadataTypeProps } from "./types";

export const TextType = ({
	metadataType,
	childrenMetadata,
	parentTitle,
}: MetadataTypeProps) => {
	if (childrenMetadata?.length) {
		return (
			<div className="flex">
				<div>{parentTitle}</div>
				<div>
					{childrenMetadata.map((m) => (
						<RenderItem key={m.id} title={m.title} value={m.formattedValue} />
					))}
				</div>
			</div>
		);
	}

	const { title, formattedValue } = metadataType;
	return <RenderItem title={title} value={formattedValue} />;
};

type RenderItemProps = {
	title: string;
	value: string;
};

const RenderItem = ({ title, value }: RenderItemProps) => {
	if (isUndefined(value)) {
		return null;
	}

	return (
		<div className="flex border-t border-base-200">
			<div className="px-2">{title} - </div>
			<div>{value}</div>
		</div>
	);
};
