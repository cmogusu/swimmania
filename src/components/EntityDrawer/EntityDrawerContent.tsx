import type { PropsWithChildren, ReactNode, RefObject } from "react";

type Props = PropsWithChildren & {
	drawerInputId?: string;
	drawerContent?: ReactNode;
	inputRef?: RefObject<HTMLInputElement | null>;
	closeDrawer?: () => void;
};

export const EntityDrawerContent = ({
	children,
	drawerInputId,
	drawerContent,
	inputRef,
	closeDrawer,
}: Props) => {
	return (
		<div className="drawer drawer-end">
			<input
				id={drawerInputId}
				ref={inputRef}
				type="checkbox"
				onClick={closeDrawer}
				className="drawer-toggle"
			/>
			<div className="drawer-content">{children}</div>
			<div className="drawer-side">
				<label
					htmlFor={drawerInputId}
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<div className="bg-base-200 min-h-full w-9/12 p-4">
					{drawerContent}
					<button
						type="button"
						onClick={closeDrawer}
						className="drawer-button btn btn-primary"
					>
						Close drawer
					</button>
				</div>
			</div>
		</div>
	);
};
