import type { MetadataProps } from "../types";

export default function ({ metadataArr }: MetadataProps) {
	return (
		<div>
			{metadataArr.map((m) => (
				<div key={m.id}>
					{m.name}: {m.value}
				</div>
			))}
		</div>
	);
}
