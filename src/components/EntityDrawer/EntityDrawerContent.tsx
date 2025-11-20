import type { PropsWithChildren, ReactNode, RefObject } from "react";

type Props = PropsWithChildren & {
	drawerInputId?: string;
	drawerContent?: ReactNode;
	inputRef?: RefObject<HTMLInputElement | null>;
	toggleDrawer?: () => void;
};

export const EntityDrawerContent = ({
	children,
	drawerInputId,
	drawerContent,
	inputRef,
	toggleDrawer,
}: Props) => {
	return (
		<div className="drawer drawer-end">
			<input
				id={drawerInputId}
				ref={inputRef}
				type="checkbox"
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
						onClick={toggleDrawer}
						className="drawer-button btn btn-primary"
					>
						Close drawer
					</button>
				</div>
			</div>
		</div>
	);
};
