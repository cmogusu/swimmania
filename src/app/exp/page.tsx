import OpenAI from "openai";
import { getSwimResultsWithSchema } from "@/server/BulkImport/FileParsers/GPT/schema";

const client = new OpenAI({
	apiKey: process.env.DEEPSEEK_API_KEY,
	baseURL: "https://api.deepseek.com/v1",
});

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

	const responseStream = await client.chat.completions
		.create({
			model: "deepseek-chat",
			messages: [
				{
					role: "user",
					content: `Extract swim results from this text. ${text}`,
				},
				{
					role: "system",
					content: "Extract swim results as JSON from the provided text.",
				},
			],
			tools: [
				{
					type: "function",
					function: getSwimResultsWithSchema,
				},
			],
			tool_choice: {
				type: "function",
				function: { name: "get_swim_results" },
			},
			stream: true,
		})
		.catch((e) => {
			console.log(e);
		});

	if (!responseStream) {
		console.log("*** - no response");
		return;
	}

	for await (const event of responseStream) {
		const e: OpenAI.Chat.Completions.ChatCompletionChunk
		event.choices[0]?.delta
		// console.log(event)

		if (event.type === "response.function_call_arguments.delta") {
			console.log("delta", event.delta);
		} else if (event.type === "response.output_item.done") {
			console.log("done", event.item);
		} else {
			console.log(event);
		}
	}
}

const text = `
#101 Women 25-29 100 Meter Free 
 Name Age Team Finals Time
 1 Waburi, Anne 29 KE 1:36.13
 2 Anjichi, Beyu 26 KE 1:42.00
 3 Mutheu, Victoria 27 KE 2:19.69 
`;

/*
 {
    name: 'get_swim_result',
    arguments: '{"rank": 1, "surname": "Waburi", "firstName": "Anne", "thirdName": null, "age": 29, "ageGroup": "25-29", "time": "1:36.13"}'
  },
  {
    name: 'get_swim_result',
    arguments: '{"rank": 2, "surname": "Anjichi", "firstName": "Beyu", "thirdName": null, "age": 26, "ageGroup": "25-29", "time": "1:42.00"}'
  },
  {
    name: 'get_swim_result',
    arguments: '{"rank": 3, "surname": "Mutheu", "firstName": "Victoria", "thirdName": null, "age": 27, "ageGroup": "25-29", "time": "2:19.69"}'
  }
*/
