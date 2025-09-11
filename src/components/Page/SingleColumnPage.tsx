import { Sidebar } from "@/components/SideBar";
import { BlankPage } from "./BlankPage";
import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export const SingleColumnPage = ({ children }: Props) => {
	return (
		<BlankPage>
			<div className="md:container min-h-full mx-auto grid grid-cols-4 sm:grid-cols-5 gap-4 w-full">
				<main className="col-start-1 col-end-5 p-4">{children}</main>
				<aside className="col-start-5 hidden sm:block">
					<Sidebar />
				</aside>
			</div>
		</BlankPage>
	);
};
