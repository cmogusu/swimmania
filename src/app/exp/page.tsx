import { Page } from "@/account";
import { EditMetadata } from "@/account/components/EditEntity/EditMetadata";

export default async function ExpPage() {
	const metadata = [
		{ id: 13, name: "poolDimensions.length", value: 25 },
		{ id: 24, name: "operatingHours.closing", value: 24480000 },
		{ id: 25, name: "hasLaneRopes", value: true },
		{ id: 26, name: "isHeated", value: true },
		{ id: 28, name: "cleanliness", value: 4 },
		{ id: 29, name: "hasOnDutyLifeguard", value: true },
		{ id: 14, name: "location.lat", value: -1.2611664809506706 },
		{ id: 15, name: "location.lng", value: 36.80447787409544 },
	];

	return (
		<Page>
			<EditMetadata entityId={6} entityType="pool" metadata={metadata} />
		</Page>
	);
}
