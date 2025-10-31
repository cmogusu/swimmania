import type { ChangeEvent } from "react";

type Props = {
	name: string;
	title: string;
	value?: number | string;
	defaultValue?: string;
	placeholder?: string;
	type?: string;
	error?: string;
	onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TextareaInput = ({
	name,
	error,
	placeholder,
	title,
	...props
}: Props) => (
	<label className="floating-label mb-3 min-h-16">
		<span>{title}</span>
		<textarea
			className={`input input-sm ${error ? "input-error" : ""}`}
			name={name}
			placeholder={placeholder || title}
			{...props}
		/>
		{error && <span className="error">{error}</span>}
	</label>
);
