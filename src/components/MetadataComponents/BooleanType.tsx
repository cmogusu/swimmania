import { TiTick, TiTimes } from "react-icons/ti";
import { isUndefined } from "@/server/utils";
import type { MetadataTypeProps } from "./types";

export const BooleanType = ({
	metadataType,
	childrenMetadata,
}: MetadataTypeProps) => {
	const metadataArr = childrenMetadata?.length
		? childrenMetadata
		: [metadataType];

	return (
		<div className="mb-2 flex">
			{metadataArr.map((m) => (
				<RenderItem key={m.id} value={m.value as boolean} title={m.title} />
			))}
		</div>
	);
};

type RenderItemProps = {
	title: string;
	value?: boolean;
};

const RenderItem = ({ title, value }: RenderItemProps) => {
	if (isUndefined(value)) {
		return null;
	}

	return (
		<>
			<span className="text-xl text-green-600">
				{value ? <TiTick /> : <TiTimes />}
			</span>
			<span>{title}</span>
		</>
	);
};
