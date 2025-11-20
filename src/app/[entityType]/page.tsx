import { auth } from "auth";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { EntitiesPage } from "@/components/EntitiesPage";
import { api } from "@/server/api";
import { EntityTypePlurals } from "@/server/constants";
import type { EntityType } from "@/server/types";

type Props = {
	params: Promise<{ entityType: EntityType }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { entityType } = await params;

	return {
		title: EntityTypePlurals[entityType],
	};
}

export default async function Home({ params, searchParams }: Props) {
	const session = await auth();
	const { entityType } = await params;
	const { page = 1 } = await searchParams;
	const entitiesData = await api.getEntities(entityType, Number(page));

	if (!entitiesData) {
		return "Ooops! No entities found";
	}

	return (
		<SessionProvider session={session}>
			<EntitiesPage entitiesData={entitiesData} entityType={entityType} />
		</SessionProvider>
	);
}
