export default async function ExpPage() {
	return (
		<div>
			<h1>hello</h1>
			<form action={handleSubmit}>
				<input type="hidden" name="token" />
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
