import { Log } from "../services/Log";

export class BaseRequest {
	DefaultPageNumber = 1;
	DefaultPageSize = 3;

	log: Log;

	constructor() {
		this.log = new Log();
	}

	handleError(res, error: Error, errorMessage: string) {
		this.log.error(errorMessage, error);
		this.respondFailure(res, errorMessage);
	}

	respondSuccess(res, data) {
		res.send({ success: true, data });
	}

	respondFailure(res, errorMessage) {
		res.send({ success: false, error: errorMessage });
	}
}
