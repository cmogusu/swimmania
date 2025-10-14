import type { ChangeEvent } from "react";

type Props = {
	name: string;
	title: string;
	value?: number | string;
	defaultValue?: number | string;
	placeholder?: string;
	type?: string;
	error?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const TextInput = ({
	name,
	error,
	placeholder,
	title,
	type,
	...props
}: Props) => (
	<label className="floating-label mb-3">
		<span>{title}</span>
		<input
			className={`input input-sm ${error ? "input-error" : ""}`}
			type={type || "text"}
			name={name}
			placeholder={placeholder || title}
			{...props}
		/>
		{error && <span className="error">{error}</span>}
	</label>
);
