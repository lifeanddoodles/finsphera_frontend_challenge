import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Heading from ".";

describe("Heading", () => {
  test("renders correctly", () => {
    render(<Heading>Title</Heading>);

    const element = screen.getByRole("heading", { name: "Title" });

    expect(element).toBeInTheDocument();
  });

  test("has correct level", () => {
    render(<Heading level={3}>Title</Heading>);

    const element = screen.getByRole("heading", {
      level: 3,
    });

    expect(element).toBeInTheDocument();
  });
});
