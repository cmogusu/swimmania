import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";
import { getLoggedInUserId } from "@/server/api";
import { isNotSet } from "@/server/utils";

export const RedirectAnonymousUser = async ({
	children,
}: PropsWithChildren) => {
	const loggedInUserId = await getLoggedInUserId();

	if (isNotSet(loggedInUserId)) {
		redirect("/login");
	}

	return children;
};
