"use client";

import type { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";
import { Loading } from "@/components/Loading";

type Props = PropsWithChildren & {
	entityId: number;
	isDisabled?: boolean;
	onSubmit?: () => void;
};

export const SubmitButton = ({ entityId, isDisabled, onSubmit }: Props) => {
	const { pending } = useFormStatus();

	return (
		<button
			className="btn btn-sm"
			type="submit"
			disabled={pending || !!isDisabled}
			{...(onSubmit ? { onSubmit } : {})}
		>
			{pending && <Loading />}
			{entityId > -1 ? "Update" : "Create"}
		</button>
	);
};
