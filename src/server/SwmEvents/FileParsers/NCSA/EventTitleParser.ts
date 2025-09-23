export class EventTitleParser {
	testRegex: RegExp = /Event [0-9]{3}/i;
	regex: RegExp =
		/Event ([0-9]+) (girls|boys|men|women) ([0-9x]+) SC Meter ([a-z]+)/i;

	test(lineOfText: string) {
		return this.testRegex.test(lineOfText);
	}

	parse(lineOfText: string) {
		const matches = lineOfText.match(this.regex);
		if (!matches) {
			throw Error("Match not found");
		}

		const [_, eventNumber, sex, swimDistance, swimStroke] = matches;
		return {
			eventNumber,
			sex,
			swimDistance,
			swimStroke,
		};
	}
}
