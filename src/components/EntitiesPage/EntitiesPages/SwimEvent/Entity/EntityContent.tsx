import type { EntityData } from "@/server/types";

type Props = {
	entity: EntityData;
	itemPosition: number;
};

export const EntityContent = ({ entity, itemPosition }: Props) => {
	const { name, description, metadata } = entity;
	const { swimDistance, swimStroke, gender, ageGroup } = metadata || {};

	return (
		// @ts-ignore
		<tr>
			<td>{itemPosition}</td>
			<td>{name}</td>
			<td>{description}</td>
			<td>{swimDistance}</td>
			<td>{swimStroke}</td>
			<td>{gender}</td>
			<td>{ageGroup}</td>
		</tr>
	);
};
