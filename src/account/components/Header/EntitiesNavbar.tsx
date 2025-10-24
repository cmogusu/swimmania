import { EntityTypesKeys } from "@/server/constants";
import type { EntityType } from "@/server/types";

type Props = {
	entityType: EntityType;
	baseUrl: string;
};

export const EntitiesNavBar = ({ entityType, baseUrl }: Props) => (
	<nav>
		<ul className="w-full menu menu-horizontal">
			{EntityTypesKeys.map((e) => (
				<li key={e}>
					{e === entityType ? (
						<span className="active">{e}</span>
					) : (
						<a href={`${baseUrl}/${e}`}>{e}</a>
					)}
				</li>
			))}
		</ul>
	</nav>
);
