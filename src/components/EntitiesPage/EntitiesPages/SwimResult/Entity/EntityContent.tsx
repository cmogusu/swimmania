import type { EntityData, RawMetadata } from "@/server/types";

type Props = {
	entity: EntityData;
	metadata?: RawMetadata;
	isMetadataLoading?: boolean;
};

export const EntityContent = ({ entity }: Props) => {
	const { name, description, metadata } = entity;
	const { rank, age, time } = metadata || {};

	return (
		<tr>
			<td>{rank}</td>
			<td>{name}</td>
			<td>{description}</td>
			<td>{age}</td>
			<td>{time}</td>
		</tr>
	);
};
