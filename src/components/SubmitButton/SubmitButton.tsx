"use client";

import type { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";
import { Loading } from "@/components/Loading";

type Props = PropsWithChildren & {
	buttonText: string;
	isDisabled?: boolean;
};

export function SubmitButton({ buttonText, isDisabled }: Props) {
	const { pending } = useFormStatus();

	return (
		<button
			className="btn btn-sm"
			type="submit"
			disabled={pending || isDisabled}
		>
			{buttonText}
			{pending && <Loading />}
		</button>
	);
}
