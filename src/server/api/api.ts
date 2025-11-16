import * as entityApi from "./entity";
import * as imageApi from "./image";
import * as importApi from "./import";
import * as metadataApi from "./metadata";
import * as relatedEntityApi from "./relatedEntity";
import * as userApi from "./user";

export const api = {
	...entityApi,
	...imageApi,
	...importApi,
	...metadataApi,
	...relatedEntityApi,
	...userApi,
};
