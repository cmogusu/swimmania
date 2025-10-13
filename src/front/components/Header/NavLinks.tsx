import Link from "next/link";
import { EntityTypesValues } from "@/server/constants";
import { Nav } from "./Nav";

export const NavLinks = () => (
	<Nav>
		{EntityTypesValues.map((v) => (
			<li key={v}>
				<Link href={`/${v}`}>{v}</Link>
			</li>
		))}
	</Nav>
);
