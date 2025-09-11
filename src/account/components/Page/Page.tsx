import type { ReactNode } from "react";
import { Breadcrumbs, type BreadcrumbType, Footer } from "@/components";
import { ToastContextProvider } from "@/context";
import { Header } from "../Header";
import { Sidebar } from "../SideBar";

type Props = {
	children: ReactNode;
	breadcrumbs?: BreadcrumbType[];
};

export const Page = ({ breadcrumbs, children }: Props) => {
	return (
		<div className="grid min-h-screen grid-body-rows gap-6">
			<Header />
			{/* <ModalRenderContextProvider> */}
			<ToastContextProvider>
				<div className="md:container min-h-full mx-auto grid grid-cols-4 sm:grid-cols-5 gap-4 w-full">
					<main className="col-start-1 col-end-5 gap-4 auto-rows-min p-4">
						<Breadcrumbs breadcrumbs={breadcrumbs} />
						{children}
					</main>
					<aside className="col-start-5 hidden sm:block">
						<Sidebar />
					</aside>
				</div>
			</ToastContextProvider>
			{/* </ModalRenderContextProvider> */}
			<Footer />
		</div>
	);
};
