type Props = {
	name: string;
	title: string;
	defaultValue?: string;
	placeholder?: string;
	type?: string;
	error?: string;
};

export const TextareaInput = ({
	name,
	defaultValue,
	error,
	placeholder,
	title,
}: Props) => (
	<label className="floating-label mb-3">
		<span>{title}</span>
		<textarea
			className={`input input-sm ${error ? "input-error" : ""}`}
			name={name}
			placeholder={placeholder || title}
			{...(defaultValue ? { defaultValue } : {})}
		/>
		{error && <span className="error">{error}</span>}
	</label>
);
