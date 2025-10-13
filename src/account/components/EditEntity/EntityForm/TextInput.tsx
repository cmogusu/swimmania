type Props = {
	name: string;
	title: string;
	defaultValue?: string;
	placeholder?: string;
	type?: string;
	error?: string;
};

export const TextInput = ({
	name,
	defaultValue,
	error,
	placeholder,
	title,
	type,
}: Props) => (
	<label className="floating-label mb-3">
		<span>{title}</span>
		<input
			className={`input input-sm ${error ? "input-error" : ""}`}
			type={type || "text"}
			name={name}
			placeholder={placeholder || title}
			{...(defaultValue ? { defaultValue } : {})}
		/>
		{error && <span className="error">{error}</span>}
	</label>
);
