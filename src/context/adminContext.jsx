"use client";

import { createContext, useContext, useMemo, useState } from "react";

const AdminContext = createContext({
	isEditingEnabled: false,
});

export const AdminContextProvider = (props) => {
	const [isEditingEnabled, setIsEditingEnabled] = useState(true);

	const context = useMemo(
		() => ({
			isEditingEnabled,
			setIsEditingEnabled,
		}),
		[isEditingEnabled],
	);

	return (
		<AdminContext.Provider value={context}>
			{props.children}
		</AdminContext.Provider>
	);
};

export const useAdminContext = () => useContext(AdminContext);
