"use client";

import { useModalRenderContext } from "@/context";
import { Suspense, useCallback, useMemo } from "react";
import { mapMetadataList } from "@/mapMetadataList";
import { Modal } from "./Modal";
import { useUpdateSearchParams } from "./useUpdateSearchParams";
import type { MapMetadata } from "@/types";

export const MapModal = () => {
	const { activeMapId, setActiveMapId } = useModalRenderContext();

	useUpdateSearchParams();

	const metadata = useMemo(
		() =>
			mapMetadataList.find(
				(metadata: MapMetadata) => metadata.id === activeMapId,
			),
		[activeMapId],
	);

	const onClose = useCallback(() => {
		setActiveMapId("");
	}, [setActiveMapId]);

	if (!metadata) {
		return null;
	}

	const MapComponent = metadata.component;

	return (
		<Suspense fallback="loading">
			<Modal activeMapId={activeMapId} onClose={onClose}>
				<MapComponent />
			</Modal>
		</Suspense>
	);
};
