"use client";

import { TOAST_RENDER_DELAY_MS } from "@/constants";
import { type MessageType, useToastContext } from "@/context";
import { Toast } from "./Toast";

export const ToastManager = () => {
	const { messages, removeMessage } = useToastContext();

	return (
		<div className="toast toast-end">
			{messages.map((message: MessageType) => (
				<Toast
					key={message.id}
					toastMessage={message}
					removeToast={removeMessage}
					removeDelay={TOAST_RENDER_DELAY_MS}
				/>
			))}
		</div>
	);
};
