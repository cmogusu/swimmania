import { extractTextFromImage } from "@/server/api";

export default async function ExpPage() {
	return (
		<div>
			<form action={extractTextFromImage}>
				<input type="submit" className="btn btn-sm" />
			</form>
		</div>
	);
}
