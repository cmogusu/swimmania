import { redirect } from "next/navigation";
import type { EntityType } from "@/server/types";

type Props = {
	params: Promise<{ entityType: EntityType }>;
};

export default async function Category({ params }: Props) {
	const { entityType } = await params;
	redirect(`/account/${entityType}/view`);
	return null;
}
