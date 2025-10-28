export type LatLng = {
	lat: number;
	lng: number;
};

export type EntityLatLng = LatLng & {
	entityId: number;
};
