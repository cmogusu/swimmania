import { EntityCard } from "./EntityCard";

export const EntityCardList = () =>
	Array(10)
		.fill("")
		.map((_, i) => <EntityCard key={i} />);
