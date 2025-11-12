import type Tesseract from "tesseract.js";
import { createWorker, PSM } from "tesseract.js";

export class ExtractTextFromImage {
	worker: Tesseract.Worker | undefined;
	options: Tesseract.RecognizeOptions | undefined;

	async getWorker() {
		if (!this.worker) {
			this.worker = await createWorker("eng");
		}

		return this.worker;
	}

	async extract(filePath: string) {
		const worker = await this.getWorker();

		await worker.setParameters({
			tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
		});

		const { data } = await worker.recognize(filePath);
		return data.text;
	}

	async extractThreeColumns(filePath: string) {
		const values = [];
		const worker = await this.getWorker();
		const rectangles = [
			{ left: 0, top: 0, width: 513, height: 1978 },
			{ left: 514, top: 0, width: 510, height: 1978 },
			{ left: 1024, top: 0, width: 520, height: 1978 },
		];

		for (const rectangle of rectangles) {
			const { data } = await worker.recognize(filePath, { rectangle });
			values.push(data.text);
		}

		return values;
	}

	async [Symbol.dispose]() {
		await this.worker?.terminate();
	}
}
