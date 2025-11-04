/** biome-ignore-all lint/a11y/useFocusableInteractive: find better solution */
/** biome-ignore-all lint/performance/noImgElement: <explanation> */

import { auth } from "auth";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import { handleSignOut } from "@/server/api/apiActions";
import type { EntityType } from "@/server/types";
import { EntitiesNavBar } from "./EntitiesNavbar";

type Props = {
	entityType: EntityType;
};

export const Header = async ({ entityType }: Props) => {
	const session = await auth();
	const user = session?.user;

	if (!user) {
		return null;
	}

	return (
		<div className="bg-base-100 shadow-sm">
			<div className="md:container mx-auto">
				<div className="navbar navbar-start w-full">
					<div className="flex-1">
						<a href="/account/">
							<Image
								src="/images/swimmania-logo.png"
								alt="Swimmania logo"
								height={20}
								width={70}
							/>
						</a>
					</div>

					<div className="navbar-center sm:flex">
						<div className="menu menu-horizontal px-1">
							<EntitiesNavBar entityType={entityType} baseUrl="/account/" />
						</div>
					</div>

					<div className="flex-1 flex justify-end">
						<div className="dropdown dropdown-end">
							<div
								tabIndex="0"
								role="button"
								className="btn btn-ghost btn-circle avatar"
							>
								<div className="w-10 rounded-full">
									{user.image ? (
										<img
											src={user.image}
											alt={user.name || "user"}
											height={40}
											width={40}
										/>
									) : (
										<FaRegUser />
									)}
								</div>
							</div>
							<ul
								tabIndex="-1"
								className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
							>
								<li>
									<a className="justify-between" href="/account/">
										Profile
									</a>
								</li>

								<li>
									<form action={handleSignOut}>
										<button type="submit">Logout</button>
									</form>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
