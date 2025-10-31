import * as z from "zod";

export default async function ExpPage() {
	const num = 36.87588352399299;
	const min = -180;
	const max = 180;
	const x = z.coerce
		.number()
		.min(min, "Too small")
		.max(max, "Too large")
		.parse(num);
	console.log(x);
	return (
		<div>
			<h1>hello</h1>
		</div>
	);
}

// const num = -1.25489104578669;
// const min = -90;
// const max = 90;
