import fs from "fs";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function extractTextAsJSON() {
	// Read image and encode as Base64
	const image = fs.readFileSync("swim_results.png").toString("base64");

	const response = await client.chat.completions.create({
		model: "gpt-4.1", // or "gpt-4o-mini" for cheaper/faster
		messages: [
			{
				role: "system",
				content:
					"You are an OCR assistant. Extract data from images and return clean JSON only.",
			},
			{
				role: "user",
				content: [
					{
						type: "text",
						text: "Extract the swim meet results into structured JSON with fields: event, name, age, team, and time.",
					},
					{
						type: "image_url",
						image_url: `data:image/png;base64,${image}`,
					},
				],
			},
		],
		response_format: { type: "json_object" }, // 👈 Forces JSON output
	});

	console.log(response.choices[0].message.content);
}

extractTextAsJSON();
