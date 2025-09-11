"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useModalRenderContext } from "@/context";
import { useEffect } from "react";
import { addQueryString, removeQueryString } from "@/utilities";

export const useUpdateSearchParams = () => {
	const router = useRouter();
	const pathname = usePathname();
	const { activeMapId } = useModalRenderContext();
	const searchParams = useSearchParams();

	// biome-ignore lint/correctness/useExhaustiveDependencies: Only need to update search params when modal is toggled
	useEffect(() => {
		const newSearchParams = activeMapId
			? addQueryString(searchParams, "modalMapId", activeMapId)
			: removeQueryString(searchParams, "modalMapId");

		const path = pathname.includes("?")
			? `${pathname}${newSearchParams}`
			: `${pathname}?${newSearchParams}`;

		router.push(path);
	}, [activeMapId]);
};
