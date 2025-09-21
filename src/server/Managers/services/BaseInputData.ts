import { clamp, isNumber, isSet } from "@/server/utils";

const MIN_PAGE_SIZE: number = 2;
const MAX_PAGE_SIZE: number = 15;
const DEFAULT_PAGE_SIZE: number = 10;

const MIN_PAGE_NUMBER: number = 1;
const MAX_PAGE_NUMBER: number = 10;
const DEFAULT_PAGE_NUMBER: number = 1;

export class BaseInputData {
	pageSize: number = DEFAULT_PAGE_SIZE;
	pageNumber: number = DEFAULT_PAGE_NUMBER;

	get offset() {
		return this.pageSize * (this.pageNumber - 1);
	}

	sanitizePageSize(pageSize?: number) {
		if (isSet(pageSize) && isNumber(pageSize)) {
			return clamp(pageSize, MIN_PAGE_SIZE, MAX_PAGE_SIZE);
		}

		return DEFAULT_PAGE_SIZE;
	}

	sanitizePageNumber(pageNumber?: number) {
		if (isSet(pageNumber) && isNumber(pageNumber)) {
			return clamp(pageNumber, MIN_PAGE_NUMBER, MAX_PAGE_NUMBER);
		}

		return DEFAULT_PAGE_NUMBER;
	}

	getPageSize() {
		// Add one to help determine if there is more data left to be fetched.
		return this.pageSize + 1;
	}
}
