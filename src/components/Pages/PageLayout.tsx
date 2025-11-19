import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function PageLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="grid page-grid-rows h-screen">
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	);
}
