import Image from "next/image";

export const Footer = () => (
	<footer className="bg-neutral">
		<div className="footer md:container mx-auto sm:footer-horizontal text-neutral-content items-center p-4">
			<aside className="grid-flow-col items-center">
				<Image
					src="/images/swimmania-logo.png"
					alt="Swimmania logo"
					height={20}
					width={70}
				/>
				<p>Copyright © {new Date().getFullYear()} - All right reserved</p>
			</aside>
			<nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
				<a href="https://facebook.com/swimmania" target="_blank" rel="noopener">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						className="fill-current"
					>
						<title>Swimmania on Facebook</title>
						<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
					</svg>
				</a>
			</nav>
		</div>
	</footer>
);
