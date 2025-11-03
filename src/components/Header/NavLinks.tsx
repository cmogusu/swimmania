import Link from "next/link";
import { ManuEntityTypes } from "@/server/constants";
import { getPlural } from "@/server/utils";
import { Nav } from "./Nav";

export const NavLinks = () => (
	<Nav>
		{ManuEntityTypes.map((entityType) => (
			<li key={entityType}>
				<Link href={`/${entityType}`}>{getPlural(entityType)}</Link>
			</li>
		))}
	</Nav>
);
