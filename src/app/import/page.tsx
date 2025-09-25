export default async function ExpPage() {
	return (
		<div>
			<form action={extractTextFromImage}>
				<input type="submit" className="btn btn-sm" />
			</form>
		</div>
	);
}

async function extractTextFromImage() {
	"use server";
	const y = await new Promise((resolve) => {
		setTimeout(() => {
			resolve({ id: 10 });
		}, 1000);
	});

	console.log(y);
}
