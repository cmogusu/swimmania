import { Link } from "next/link";

export const LinkButton = ({ path, text }) => (
	<Link href={path} className="btn btn-lg btn-primary m-1">
		<span>{text ?? "Go"}</span>
	</Link>
);
