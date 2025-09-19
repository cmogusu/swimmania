import { EntityTypesValues } from "@/constants";

export const NavLinks = () => (
	<>
		{EntityTypesValues.map((v) => (
			<li key={v}>
				<a href={`/${v}`}>{v}</a>
			</li>
		))}
	</>
);
