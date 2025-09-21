import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: {
		template: "%s | swimmania",
		default: "Swimmania",
	},
	description:
		"Find the perfect pool, coach, lifeguard, swimming competition and more",
	keywords: [
		"coache",
		"swimmer",
		"swimming event",
		"swimming gala",
		"lifeguards",
		"swimming pools",
		"pools",
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-theme="light">
			<body className={"antialiased"}>{children}</body>
		</html>
	);
}
