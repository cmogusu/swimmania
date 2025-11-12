const swimResult = {
	type: "object",
	properties: {
		rank: {
			type: "integer",
			description: "The position at which the swimmer completed the race",
		},
		surname: {
			type: "string",
			minLength: 2,
			maxLength: 20,
			description:
				"This is the surname of the swimmer. It is the name that is placed first in every swim result",
		},
		firstName: {
			type: "string",
			minLength: 2,
			maxLength: 20,
			description:
				"This is the first name of the swimmer. It is the name that is placed second in every swim result",
		},
		thirdName: {
			type: ["string", "null"],
			description: "This is the third name or initial",
		},
		age: {
			type: ["number", "null"],
			description: "Age of the swimmer",
			minimum: 5,
			maximum: 100,
		},
		team: {
			type: ["string", "null"],
			description: "The team in which the swimmer competed",
		},
		time: {
			type: "string",
			description:
				"Time taken to complete the race. The time can be omitted if the swimmer did not finish the race, or was disqualified. Write DNF if swimmer did not finish and DQ if disqualified.",
			format: "time",
		},
	},
};

export const getSwimEvent = {
	name: "get_swim_event",
	description:
		"Extract swim events and the related swimmer results from the provided text",
	strict: true,
	parameters: {
		type: "object",
		properties: {
			eventNumber: {
				type: "number",
				description:
					"A three digit number that represents the event. It is often prefixed with #",
			},
			stroke: {
				type: "string",
				enum: [
					"freestyle",
					"butterfly",
					"breaststroke",
					"breaststroke",
					"individual_medley",
					"freestyle_relay",
					"medley_relay",
				],
				description: "The type of swimming style to be used in the event",
			},
			distance: {
				type: "string",
				description: "The distance to be swam in the event",
			},
			distanceUnit: {
				type: "string",
				enum: ["meter", "yard"],
				description:
					"The unit of length used to measure the distance, whether meters or yards",
			},
			gender: {
				type: "string",
				enum: ["male", "female", "mixed"],
				description:
					"This is gender of the swimmers the event will have. This is often set as men or women but can also be boys and girls",
			},
			ageGroup: {
				type: "string",
				description:
					"In some situations, a range of ages may be set instaed of an exact age. This value specifies that range. Use the swimmer's age if a range is not specified",
			},
			results: {
				type: "array",
				items: swimResult,
				description: "List of swimmers and their results in the event",
			},
		},
		additionalProperties: false,
		required: [
			"eventNumber",
			"stroke",
			"distance",
			"distanceUnit",
			"gender",
			"ageGroup",
			"results",
		],
	},
};
