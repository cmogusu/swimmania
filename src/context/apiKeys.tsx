"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ApiKeys } from "@/server/types";
import { withServerSafetyHoc } from "./withServerSafetyHoc";

type ApiKeysContextType = ApiKeys & {
	areKeysSet: boolean;
};

export const initialKeys = {
	mapbox: "",
	maptiler: "",
	tomtom: "",
	azure: "",
	areKeysSet: false,
};

const ApiKeysContext = createContext<ApiKeysContextType>(initialKeys);

type Props = {
	getApiKeys: () => Promise<ApiKeys>;
	children: ReactNode;
};

const ApiContextProviderLocal = ({ children, getApiKeys }: Props) => {
	const [keys, setKeys] = useState<ApiKeysContextType>(initialKeys);

	useEffect(() => {
		if (!getApiKeys) {
			return;
		}
		getApiKeys().then((newKeys: ApiKeys) => {
			const updatedKeys: ApiKeysContextType = {
				...newKeys,
				areKeysSet: true,
			};
			setKeys(updatedKeys);
		});
	}, [getApiKeys]);

	const context = useMemo(() => keys, [keys]);

	return <ApiKeysContext value={context}>{children}</ApiKeysContext>;
};

export const useApiKeyContext = () => useContext(ApiKeysContext);

export const ApiContextProvider = withServerSafetyHoc(ApiContextProviderLocal);
