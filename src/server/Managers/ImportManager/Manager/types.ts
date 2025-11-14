export type RawFileImportInputs = {
	file: File;
};

export type RawFileNameImportInputs = {
	fileName: string;
};

export type EntityInsertData<T> = {
	data: T;
	onComplete: (isProcessingSuccessful: boolean) => void;
};

export interface ImportManager {
	importFile: (rawInputs: RawFileImportInputs) => Promise<void>;
}
