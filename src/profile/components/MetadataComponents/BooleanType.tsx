import { type IMetadataType, isUndefined } from "@/server";

type Props = {
	metadataType: IMetadataType;
};

export const BooleanType = ({ metadataType }: Props) => {
	const { name, value, formattedValue } = metadataType;

	if (isUndefined(value)) {
		return null;
	}

	return (
		<div>
			<div>
				{name} = {formattedValue}
			</div>
		</div>
	);
};
