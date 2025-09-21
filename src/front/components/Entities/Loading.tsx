"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEntitiesContext } from "@/front/context";

export const Loading = () => {
	const { isLoading } = useEntitiesContext();

	return isLoading ? (
		<AiOutlineLoading3Quarters className="animate-spin" />
	) : null;
};
