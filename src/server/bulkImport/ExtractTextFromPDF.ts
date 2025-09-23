import fs from "node:fs";
import pdf from "pdf-parse-new";

export class ExtractTextFromPDF {
	async extract(filePath: string) {
		const dataBuffer = fs.readFileSync(filePath);
		const { text } = await pdf(dataBuffer);
		return text;
	}
}
