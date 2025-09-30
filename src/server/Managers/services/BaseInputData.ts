import type { IPaginated } from "@/server/types";
import { clamp, isNumber, isSet } from "@/server/utils";

const MIN_PAGE_SIZE: number = 2;
const MAX_PAGE_SIZE: number = 15;
const DEFAULT_PAGE_SIZE: number = 10;

const MIN_PAGE_NUMBER: number = 1;
const MAX_PAGE_NUMBER: number = 10;
const DEFAULT_PAGE_NUMBER: number = 1;

export class BaseInputData implements IPaginated {
	_pageSize: number = DEFAULT_PAGE_SIZE;
	_pageNumber: number = DEFAULT_PAGE_NUMBER;

	set pageSize(pageSize: number | undefined) {
		if (isSet(pageSize) && isNumber(pageSize)) {
			this._pageSize = clamp(pageSize, MIN_PAGE_SIZE, MAX_PAGE_SIZE);
		}

		this._pageSize = DEFAULT_PAGE_SIZE;
	}

	get pageSize(): number {
		return this._pageSize + 1;
	}

	set pageNumber(pageNumber: number | undefined) {
		if (isSet(pageNumber) && isNumber(pageNumber)) {
			this._pageNumber = clamp(pageNumber, MIN_PAGE_NUMBER, MAX_PAGE_NUMBER);
		}

		this._pageNumber = DEFAULT_PAGE_NUMBER;
	}

	get pageNumber(): number {
		return this._pageNumber;
	}

	get offset() {
		return this._pageSize * (this._pageNumber - 1);
	}
}
