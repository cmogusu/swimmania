import Image from "next/image";
import { NavLinks } from "./NavLinks";

export const Header = () => (
	<div className="bg-base-100 shadow-sm">
		<div className="md:container mx-auto navbar">
			<div className="navbar-start">
				<div className="dropdown">
					<ul
						// biome-ignore lint/a11y/noNoninteractiveTabindex: Needed to enable tabbing into menu
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
					>
						<NavLinks />
					</ul>
				</div>
				<Image
					className="opacity-50"
					src="/images/swimmania-logo.png"
					alt="Swimmania logo"
					height={50}
					width={50}
				/>
			</div>
			<div className="navbar-center sm:flex">
				<ul className="menu menu-horizontal px-1">
					<NavLinks />
				</ul>
			</div>
			<div className="navbar-end">
				<button
					tabIndex={0}
					type="button"
					className="btn btn-ghost btn-circle avatar"
				>
					Login
				</button>
			</div>
		</div>
	</div>
);
