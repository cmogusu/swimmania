"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import { generateRandomId } from "@/utilities/general";
import { withServerSafetyHoc } from "./withServerSafetyHoc";

export type ToastAlertType = "success" | "info" | "error" | "warning";

export type MessageType = {
	id: number;
	message: string;
	type: ToastAlertType;
};

interface ContextType {
	messages: MessageType[];
	setMessage: (message: string, type: ToastAlertType) => void;
	removeMessage: (id: number) => void;
}

const initialContext = {
	messages: [],
	setMessage: () => {},
	removeMessage: () => {},
};

const ToastContext = createContext<ContextType>(initialContext);

type Props = {
	children: ReactNode;
};

const ContextProvider = ({ children }: Props) => {
	const [messages, setMessages] = useState<MessageType[]>([]);

	const setMessage = useCallback((message: string, type: ToastAlertType) => {
		const newMessage = {
			id: generateRandomId(),
			message,
			type,
		};
		setMessages((prevMessages) => [...prevMessages, newMessage]);
	}, []);

	const removeMessage = useCallback((id: number) => {
		setMessages((prevMessages) =>
			prevMessages.filter((message) => message.id !== id),
		);
	}, []);

	const context = useMemo(
		() => ({
			messages,
			setMessage,
			removeMessage,
		}),
		[messages, setMessage, removeMessage],
	);

	return <ToastContext value={context}>{children}</ToastContext>;
};

export const useToastContext = () => useContext(ToastContext);

export const ToastContextProvider = withServerSafetyHoc(ContextProvider);
