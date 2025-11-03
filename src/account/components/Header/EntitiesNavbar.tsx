import { ManuEntityTypes } from "@/server/constants";
import type { EntityType } from "@/server/types";
import { getPlural } from "@/server/utils";

type Props = {
	entityType: EntityType;
	baseUrl: string;
};

export const EntitiesNavBar = ({
	entityType: activeEntityType,
	baseUrl,
}: Props) => (
	<nav>
		<ul className="w-full menu menu-horizontal">
			{ManuEntityTypes.map((entityType: EntityType) => (
				<li key={entityType}>
					{entityType === activeEntityType ? (
						<span className="active">{getPlural(entityType)}</span>
					) : (
						<a href={`${baseUrl}/${entityType}`}>{getPlural(entityType)}</a>
					)}
				</li>
			))}
		</ul>
	</nav>
);
