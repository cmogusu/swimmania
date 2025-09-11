"use client";

import type { ReactNode } from "react";

export function ServerSafeWrapper(props: { children?: ReactNode }) {
	if (typeof window === "undefined") {
		return null;
	}

	return props.children;
}
