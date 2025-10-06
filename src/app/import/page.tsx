import jwt from "jsonwebtoken";

const userKey = "myBestKey";

export default async function ExpPage() {
	const userToken = jwt.sign({ id: 30, user: "clive" }, userKey);

	return (
		<div>
			<form action={handleSubmit}>
				<input type="hidden" name="token" defaultValue={userToken} />
				<input type="submit" className="btn btn-sm" />
			</form>
		</div>
	);
}

async function handleSubmit(formData: FormData) {
	"use server";

	const token = formData.get("token");
	const decoded = jwt.verify(token as string, userKey);

	console.log(decoded);
}
