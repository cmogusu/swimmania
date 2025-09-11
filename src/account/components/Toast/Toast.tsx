"use client";

import { useEffect } from "react";
import type { MessageType } from "@/context";

type Props = {
	toastMessage: MessageType;
	removeDelay: number;
	removeToast: (id: number) => void;
};

export const Toast = ({ toastMessage, removeToast, removeDelay }: Props) => {
	const { id, type, message } = toastMessage;
	useEffect(() => {
		setTimeout(() => {
			removeToast(id);
		}, removeDelay);
	}, [id, removeDelay, removeToast]);

	return (
		<div className={`alert alert-${type}`}>
			<span>{message}</span>
		</div>
	);
};
