import { type IMetadataType, isUndefined } from "@/server";

type Props = {
	metadataType: IMetadataType;
};

export const ParentType = ({ metadataType }: Props) => {
	const { children } = metadataType;
	const childrenWithValues = children?.filter((child) => child.hasValue);

	if (isUndefined(childrenWithValues)) {
		return null;
	}

	return (
		<div>
			{childrenWithValues.map(({ id, name, formattedValue }: IMetadataType) => (
				<div key={id}>
					{name} = {formattedValue}
				</div>
			))}
		</div>
	);
};
