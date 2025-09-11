import { Switch } from "antd";
import React, { useCallback } from "react";

export const BooleanInput = ({ name, value, onChange }) => {
	const _onChange = useCallback(
		(newValue) => {
			onChange(name, newValue);
		},
		[onChange],
	);

	return (
		<Switch value={value === "false" ? false : value} onChange={_onChange} />
	);
};
