export type RawUploadImageInputs = {
	file: File;
};

export type RawUploadPdfInputs = {
	file: File;
};

export type RawUploadFileInputs = {
	file: File;
	uploadDirectory: string;
	allowedFileTypes: string[];
};

export type RawDeleteImageInputs = {
	filePath: string;
};

export type RawDeletePdfInputs = {
	filePath: string;
};

export type RawDeleteFileInputs = {
	filePath: string;
};
