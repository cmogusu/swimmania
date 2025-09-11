import { SingleColumnPage } from "@/components/Page";
import { MapPage } from "@/components/MapPage";

type Props = {
	params: Promise<{ mapId: string }>;
};

export default async function MapId({ params }: Props) {
	const { mapId } = await params;

	return (
		<SingleColumnPage>
			<MapPage mapId={mapId} />
		</SingleColumnPage>
	);
}
