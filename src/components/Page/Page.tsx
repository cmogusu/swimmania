import type { ReactNode } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";
import "./style.css";

type Props = {
	children: ReactNode;
};

export const Page = ({ children }: Props) => {
	return (
		<div className="grid page-grid-rows h-screen">
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	);
};
