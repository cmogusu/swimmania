export default async function Page() {
	return (
		<div className="p-6">
			<form action={doSth}>
				<input type="hidden" name="go" value="go" />
				<input type="submit" className="btn btn-sm" value="delete" />
			</form>
		</div>
	);
}

async function doSth() {
	"use server";
	console.log("hey");
}
