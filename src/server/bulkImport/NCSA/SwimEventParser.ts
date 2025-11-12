import type { ILineTypeParser, SwimEventRawData } from "../types";

export class SwimEventParser implements ILineTypeParser {
	testRegex: RegExp = /Event [0-9]{3}/i;
	regex: RegExp =
		/Event ([0-9]+) (girls|boys|men|women) ([0-9x]+) SC Meter ([a-z]+)/i;

	test(lineOfText: string) {
		return this.testRegex.test(lineOfText);
	}

	parse(lineOfText: string): SwimEventRawData {
		const matches = lineOfText.match(this.regex);
		if (!matches) {
			throw Error("Match not found");
		}
		const ageGroup = ""; // Implement agegroup
		const [_, eventNumber, gender, swimDistance, swimStroke] = matches;
		return {
			eventNumber,
			gender,
			swimDistance,
			swimStroke,
			ageGroup,
		};
	}
}
