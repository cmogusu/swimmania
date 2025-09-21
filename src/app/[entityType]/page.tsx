import type { Metadata } from "next";
import { EntityTypePlurals } from "@/constants";
import { Page, Section1, Section2 } from "@/front";
import { api, type EntityType } from "@/server";

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
	const { entityType } = await params;
	const { page = 1 } = await searchParams;
	const entitiesData = await api.getEntities(entityType, Number(page));

	return (
		<Page>
			<Section1 />
			<Section2 entityType={entityType} entitiesData={entitiesData} />
		</Page>
	);
}
