import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./style.css";

type Props = {
	children: ReactNode;
};

export const BlankPage = ({ children }: Props) => {
	return (
		<div className="grid min-h-screen grid-body-rows gap-6">
			<Header />
			{children}
			<Footer />
		</div>
	);
};
