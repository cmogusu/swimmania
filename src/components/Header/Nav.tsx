"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ManuEntityTypes } from "@/server/constants";
import { getPlural } from "@/server/utils";

type Props = {
	children: ReactNode;
};

export const Nav = (_: Props) => {
	const pathname = usePathname();

	return ManuEntityTypes.map((v) => (
		<li key={v}>
			<Link className={pathname === v ? "active" : ""} href={`/${v}`}>
				{getPlural(v)}
			</Link>
		</li>
	));
};
