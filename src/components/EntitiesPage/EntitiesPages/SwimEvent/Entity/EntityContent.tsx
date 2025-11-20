import { Loading } from "@/components/Loading";
import type { EntityData, RawMetadata } from "@/server/types";

type Props = {
	entity: EntityData;
	itemPosition: number;
	metadata?: RawMetadata;
	isMetadataLoading?: boolean;
};

export const EntityContent = ({
	entity,
	itemPosition,
	metadata,
	isMetadataLoading,
}: Props) => {
	const { name, description } = entity;

	return (
		// @ts-ignore
		<tr>
			<td>{itemPosition}</td>
			<td>{name}</td>
			<td>{description}</td>
			<td>
				{metadata?.swimDistance} {isMetadataLoading && <Loading />}
			</td>
			<td>
				{metadata?.swimStroke} {isMetadataLoading && <Loading />}
			</td>
			<td>
				{metadata?.gender} {isMetadataLoading && <Loading />}
			</td>
			<td>
				{metadata?.ageGroup} {isMetadataLoading && <Loading />}
			</td>
		</tr>
	);
};
