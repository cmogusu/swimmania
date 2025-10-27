import jwt from "jsonwebtoken";
import { auth } from "../../../auth";

const userKey = "myBestKey";

export default async function ExpPage() {
	const session = await auth();
	const userToken = jwt.sign({ id: 30, user: "clive" }, userKey);

	console.log(session);
	return (
		<div>
			<h1>hello</h1>
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
