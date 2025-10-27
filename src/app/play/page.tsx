import { api } from "@/server/api";

export default async function ExpPage() {
	const list = await api.getMetadataList("lifeguard", 102, [
		"dob",
		"location.lat",
		"location.lng",
	]);
	console.log(list);

	return (
		<div>
			<h1>hello</h1>
			<form action={handleSubmit}>
				<input type="hidden" name="token" defaultValue={"token"} />
				<input type="submit" className="btn btn-sm" />
			</form>
		</div>
	);
}

async function handleSubmit(formData: FormData) {
	"use server";

	const token = formData.get("token");

	console.log(token);
}
