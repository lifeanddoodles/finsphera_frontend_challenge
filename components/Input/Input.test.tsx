import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Input, { EmailInput } from ".";

describe("Input", () => {
  test("renders correctly", () => {
    const fakeValue = "";
    const mockHandleChange = jest.fn();

    render(
      <Input
        label="First name:"
        type="text"
        id="firstName"
        onChange={mockHandleChange}
        value={fakeValue}
      />
    );

    const element = screen.getByRole("textbox");

    expect(element).toBeInTheDocument();
  });

  test("renders initial value correctly", () => {
    const fakeValue = "initialValue";
    const mockHandleChange = jest.fn();

    render(
      <Input
        label="First name:"
        type="text"
        id="firstName"
        onChange={mockHandleChange}
        value={fakeValue}
      />
    );

    const element = screen.getByRole("textbox") as HTMLInputElement;

    expect(element.value).toBe(fakeValue);
  });

  test("updates value", async () => {
    user.setup();
    const mockHandleChange = jest.fn();

    render(
      <Input
        label="First name:"
        type="text"
        id="firstName"
        onChange={mockHandleChange}
      />
    );
    const element = screen.getByRole("textbox") as HTMLInputElement;

    await act(async () => {
      await user.type(element, "test");
    });

    expect(element.value).toBe("test");
  });

  test("handles required error", async () => {
    user.setup();
    const mockHandleChange = jest.fn();

    const { rerender } = render(
      <Input
        label="First name:"
        type="text"
        id="firstName"
        onChange={mockHandleChange}
        required
      />
    );
    const firstName = screen.getByRole("textbox") as HTMLInputElement;

    await act(async () => {
      firstName.focus();
      await user.tab();
    });

    rerender(
      <Input
        label="First name:"
        type="text"
        id="firstName"
        onChange={mockHandleChange}
        required
      />
    );

    const firstNameError = await screen.findByText("Constraints not satisfied");

    expect(firstNameError).toBeInTheDocument();
  });
});

describe("EmailInput", () => {
  test.each`
    value
    ${"a"}
    ${"a@b"}
    ${"a@b.c"}
  `(`given invalid email value $value, renders error`, async ({ value }) => {
    user.setup();
    const mockHandleChange = jest.fn();

    const { rerender } = render(
      <EmailInput
        label="Email:"
        id="email"
        onChange={mockHandleChange}
        value=""
      />
    );

    const element = screen.getByRole("textbox") as HTMLInputElement;

    await act(async () => {
      await user.type(element, value);
      await user.tab();
    });

    rerender(
      <EmailInput
        label="Email:"
        id="email"
        onChange={mockHandleChange}
        value=""
      />
    );

    const emailError = await screen.findByText("Constraints not satisfied");

    expect(emailError).toBeInTheDocument();
  });
});
