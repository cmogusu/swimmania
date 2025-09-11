export class Log {
	sessionId: number;
	isDisabled: boolean = false;

	constructor() {
		this.sessionId = Math.floor(Math.random() * 1000);
	}

	enable() {
		this.isDisabled = false;
	}

	disable() {
		this.isDisabled = true;
	}

	error(staticMessage: string, error?: Error) {
		if (this.isDisabled) {
			return;
		}

		const payload = {
			staticMessage,
			errorMessage: error?.message,
			errorStack: error?.stack,
			sessionId: this.sessionId,
		};
		console.log(payload);
	}

	appLogic(message: string) {
		if (this.isDisabled) {
			return;
		}

		console.log({ message, sessionId: this.sessionId });
	}
}
