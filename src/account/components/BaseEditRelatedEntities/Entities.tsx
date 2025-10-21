import type { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
	title: string;
};

export const Entities = ({ title, children }: Props) => {
	return (
		<section>
			<h3>{title}</h3>
			<div className="grid grid-cols-3 gap-2">{children}</div>
		</section>
	);
};
