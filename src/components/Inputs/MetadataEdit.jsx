import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import React, { useCallback, useState } from "react";
import { MetadataTypes } from "../../constants";
import { useAdminContext } from "../../context";
import { api } from "../../utilities";
import { BooleanInput } from "./BooleanInput";
import { EditWrapper } from "./EditWrapper";
import { RatingsInput } from "./RatingsInput";
import { SelectInput } from "./SelectInput";
import { TextInput } from "./TextInput";
import "./style.css";

export const MetadataEdit = (props) => {
	const { metadataKey, metadataValue, metadataDetails, poolId } = props;
	const { options, type } = metadataDetails;
	const [isLoading, setIsLoading] = useState();

	const { isEditingEnabled } = useAdminContext();
	const [value, setValue] = useState(metadataValue || "");

	const formatedValue = formatUneditedValue(value, metadataDetails);
	const InputComponent = getInputComponent(type, options);

	const onSubmit = useCallback(async () => {
		setIsLoading(true);
		await api.editMetadata(poolId, metadataKey, value);
		setIsLoading(false);
	}, [value]);

	if (!isEditingEnabled) {
		return formatedValue;
	}

	return (
		<EditWrapper
			render={(isEditing) =>
				isEditing ? (
					<InputComponent
						options={options}
						type={type}
						value={value}
						onChange={setValue}
						disabled={isLoading}
					/>
				) : (
					formatedValue
				)
			}
			onSubmit={onSubmit}
		/>
	);
};

const getInputComponent = (type, options) => {
	if (type === MetadataTypes.ratings) {
		return RatingsInput;
	}

	if (type == MetadataTypes.boolean) {
		return BooleanInput;
	}

	if (options) {
		return SelectInput;
	}

	return TextInput;
};

const formatUneditedValue = (value, metadataDetails) => {
	const { prefix = "", suffix = "", options = [], type } = metadataDetails;
	const formatedValue = options.find(({ key }) => key == value);

	if (type === MetadataTypes.ratings) {
		return <Rate value={value} disabled />;
	}

	if (type === MetadataTypes.boolean) {
		return value ? <CheckOutlined /> : <CloseOutlined />;
	}

	return `${prefix}${formatedValue?.value ?? value}${suffix}`;
};
