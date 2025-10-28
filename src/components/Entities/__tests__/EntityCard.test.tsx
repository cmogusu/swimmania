import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import "@testing-library/dom";
import { DefaultSiteImage } from "@/constants";
import type { EntityData } from "@/server/types";
import { EntityCard } from "../Entity";

const mockDefaultImage = {
	id: 5,
	isDefault: true,
	...DefaultSiteImage,
};

const mockEntity: EntityData = {
	id: 3,
	type: "pool",
	name: "Best pool",
	description: "This is the best pool",
	location: "Nairobi",
	defaultImage: mockDefaultImage,
	images: [],
	metadata: [],
};

test("has correct header", () => {
	// Act
	render(<EntityCard entity={mockEntity} />);
	const heading = screen.getByRole("heading", {
		level: 2,
		name: `${mockEntity.name} - ${mockEntity.id}`,
	});

	// Assert
	expect(heading).toBeDefined();
});
