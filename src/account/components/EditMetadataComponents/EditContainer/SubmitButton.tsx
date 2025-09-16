"use client";
import { useFormStatus } from "react-dom";

type Props = {
	buttonText: string;
};

export function SubmitButton({ buttonText }: Props) {
	const status = useFormStatus();
	return (
		<button className="btn btn-sm" type="submit">
			{status.pending ? "updating..." : buttonText}
		</button>
	);
}
