import type { ReactNode } from "react";

export const withServerSafetyHoc = <P extends object>(
	Component: React.ComponentType<P>,
) =>
	function ServerSafeHoc(props: P & { children?: ReactNode }) {
		if (typeof window === "undefined") {
			return props.children ?? null;
		}

		return <Component {...props} />;
	};
