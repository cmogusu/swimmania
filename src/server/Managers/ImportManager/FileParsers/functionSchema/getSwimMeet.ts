export const getSwimMeet = {
	name: "get_swim_meet",
	description: "Extract information on the swim meet from the provided text",
	strict: true,
	parameters: {
		type: "object",
		properties: {
			name: {
				type: "string",
				description: "The name of the swimming meet",
			},
			startDate: {
				type: "string",
				description: "Date on which the meet starts",
				format: "date",
			},
			endDate: {
				type: "string",
				description: "Date on which the meet ends",
				format: "date",
			},
			description: {
				type: ["string", "null"],
				description: "Any available information about the swim meet",
			},
			location: {
				type: ["string", "null"],
				description: "Any information on where the meet was held",
			},
		},
		additionalProperties: false,
		required: ["name", "startDate", "endDate", "description", "location"],
	},
};
