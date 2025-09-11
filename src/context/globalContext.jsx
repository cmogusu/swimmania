"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

const noop = () => {};

const GlobalContext = createContext({
	currentEntityId: "",
	setCurrentEntityId: noop,

	currentEntity: {},
	setCurrentEntity: noop,

	pools: [],
	setPools: noop,

	getPoolById: noop,
	filterPoolsByCategoryId: noop,
	categories: [],

	metadataDetails: {},
	setMetadataOptions: noop,

	reloadData: noop,
	setReloadData: noop,
});

export const GlobalContextProvider = (props) => {
	const [currentEntityId, setCurrentEntityId] = useState("");
	const [currentEntity, setCurrentEntity] = useState({});
	const [metadataDetails, setMetadataDetails] = useState({});

	const context = useMemo(
		() => ({
			currentEntityId,
			setCurrentEntityId,

			currentEntity,
			setCurrentEntity,

			metadataDetails,
			setMetadataDetails,
		}),
		[
			currentEntityId,
			setCurrentEntityId,
			currentEntity,
			setCurrentEntity,
			metadataDetails,
			setMetadataDetails,
		],
	);

	return (
		<GlobalContext.Provider value={context}>
			{props.children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => useContext(GlobalContext);
