export type ImageFileDataItem = {
  originalname: string;
  path: string;
  filename: string;
  size: number;
}

// Outputs
export type ImageDatabaseRawOutputData = {
  id: number;
  entityId: number;
  name: string;
  description: string;
  isDefault: boolean;
  filepath: string;
}

export type ImageDatabaseOutputData = Required<ImageDatabaseRawOutputData>

// Inputs
export type ImageGetAllRawInputs = {
  entityId: number,
}

export type ImageDefaultRawInputs = ImageGetAllRawInputs;

export type ImageGetByIdRawInputs = {
  id: number,
  entityId: number,
}

export type ImageUpdateRawInputs = ImagePostRawInputs & {
  id: number,
}

export type ImagePostRawInputs = {
  entityId: number,
  name: string,
  description?: string,
  location?: string,
}

export type ImageDeleteRawInputs = {
  id: number,
  entityId: number,
}

export type ImageRawInputs = {
  id?: number;
  entityId: number;
  name?: string;
  description?: string;
  isDefault?: boolean;
  file?: ImageFileDataItem;
}
