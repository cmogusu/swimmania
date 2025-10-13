import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Play } from "../Play";

test("should render", () => {
	// Arrange
	const mockHandleClick = () => {};

	// Act
	render(<Play handleClick={mockHandleClick} />);
	const button = screen.getByRole("button");
	console.log(button);

	// Assert
	expect(button).toBeDefined();
});
