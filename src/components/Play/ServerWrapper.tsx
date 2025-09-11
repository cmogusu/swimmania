import { ModalRenderContextProvider } from "@/context";

export const ServerWrapper = (props) => {
	if (typeof window === "undefined") {
		return props.children;
	}

	return (
		<ModalRenderContextProvider>{props.children}</ModalRenderContextProvider>
	);
};
