"use client";

import { Profiler, type PropsWithChildren } from "react";
import { logInfo } from "@/utilities/log";

const appId = "swimmania-frontend";
const logProfileInfo = (
	id: string,
	phase: "mount" | "update" | "nested-update",
	actualDuration: number,
	baseDuration: number,
	startTimestamp: number,
	commitTimestamp: number,
) => {
	logInfo(
		id,
		phase,
		actualDuration,
		baseDuration,
		startTimestamp,
		commitTimestamp,
	);
};

export const AppProfiler = ({ children }: PropsWithChildren) => {
	return (
		<Profiler id={appId} onRender={logProfileInfo}>
			{children}
		</Profiler>
	);
};
