import { useCallback, useEffect, useRef } from "react";
import "./style.css";

type Props = {
	children: React.ReactElement;
	activeMapId: string;
	onClose: () => void;
};

export const Modal = ({ activeMapId, onClose, children }: Props) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	const handleClose = useCallback(() => {
		dialogRef.current?.close();
		onClose();
	}, [onClose]);

	useEffect(() => {
		activeMapId && dialogRef.current?.showModal();
		return () => {
			dialogRef.current?.close();
		};
	}, [activeMapId]);

	return (
		<dialog className="modal" ref={dialogRef}>
			<div className="modal-box bg-white modal-top md:container max-h-screen-80">
				<form method="dialog">
					<button
						className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-white drop-shadow"
						type="button"
						onClick={handleClose}
					>
						✕
					</button>
				</form>

				<div>{children}</div>

				{/* Close when close button is clicked */}
				<div className="modal-action ml-auto">
					<form method="dialog">
						<button
							className="btn btn-outline"
							type="button"
							onClick={handleClose}
						>
							Close
						</button>
					</form>
				</div>
			</div>

			{/* Close when backdrop is clicked */}
			<form method="dialog" className="modal-backdrop">
				<button type="button" onClick={handleClose}>
					close
				</button>
			</form>
		</dialog>
	);
};
