"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { EntityTypesValues } from "@/server/constants";

type Props = {
	children: ReactNode;
};

export const Nav = (_: Props) => {
	const pathname = usePathname();

	return EntityTypesValues.map((v) => (
		<li key={v}>
			<Link className={pathname === v ? "active" : ""} href={`/${v}`}>
				{v}
			</Link>
		</li>
	));
};
