import type { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
	title: string;
	className?: string;
};

export const Entities = ({ className, title, children }: Props) => {
	return (
		<div className={`border border-gray-200 p-4 ${className}`}>
			<h3 className="mt-2 mb-2">{title}</h3>
			<div className="grid grid-cols-3 gap-2">{children}</div>
		</div>
	);
};
