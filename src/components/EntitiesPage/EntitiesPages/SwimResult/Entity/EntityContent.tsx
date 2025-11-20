import { Loading } from "@/components/Loading";
import type { EntityData, RawMetadata } from "@/server/types";

type Props = {
	entity: EntityData;
	metadata?: RawMetadata;
	isMetadataLoading?: boolean;
};

export const EntityContent = ({
	entity,
	metadata,
	isMetadataLoading,
}: Props) => {
	const { name, description } = entity;

	return (
		<tr>
			<td>{metadata?.rank}</td>
			<td>{name}</td>
			<td>{description}</td>
			<td>
				{metadata?.age} {isMetadataLoading && <Loading />}
			</td>
			<td>
				{metadata?.time} {isMetadataLoading && <Loading />}
			</td>
		</tr>
	);
};
