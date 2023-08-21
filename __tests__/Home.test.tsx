import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home component", () => {
	it("it should a under construction element", () => {
		render(<Home />); //ARRANGE

		const element = screen.getByText(/En cours de développement/i); //ACT

		expect(element).toBeInTheDocument(); //ASSERT
	});
});
