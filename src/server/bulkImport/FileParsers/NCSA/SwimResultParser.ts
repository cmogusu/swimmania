import type { ILineTypeParser, SwimResultRawData } from "../../types";

export class SwimResultParser implements ILineTypeParser {
	testRegex: RegExp = /\d [a-z,\s]+/i;
	regex: RegExp =
		/(\d) ([a-z,\s]+) ([0-9-]+) ([a-z\s]+) (NT|[0-9:.]+) (DQ|[0-9:.]+)/i;

	test(lineOfText: string) {
		return this.testRegex.test(lineOfText);
	}

	parse(lineOfText: string): SwimResultRawData {
		const matches = lineOfText.match(this.regex);
		if (!matches) {
			throw Error("Match not found");
		}

		const [_, position, swimmerName, ageGroup, team, seedTime, finalsTime] =
			matches;

		return {
			position,
			swimmerName,
			ageGroup,
			team,
			seedTime,
			finalsTime,
		};
	}
}
