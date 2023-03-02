import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Input } from ".";

describe("Input", () => {
  it("should have label bar and name foo", () => {
    render(<Input name="foo" label="bar" />);
    const input = document.querySelector("input");

    const label = screen.getByLabelText("bar");
    expect(label).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "foo");
  });
  it("should have type password", () => {
    render(<Input name="foo" label="bar" type="password" />);
    const input = document.querySelector("input");
    expect(input).toHaveAttribute("type", "password");
  });
  it("should have write foo in input", () => {
    render(<Input name="foo" label="bar" placeholder="foo" />);

    const input = screen.getByPlaceholderText("foo");
    expect(input).toBeInTheDocument();

    userEvent.type(input, "foo");

    expect(input).toHaveValue("foo");
  });
  it("should have helper text", () => {
    render(<Input name="foo" label="bar" helperText="helper text" />);

    const helperText = screen.getByText("helper text");
    expect(helperText).toBeInTheDocument();
  });
  it("should have focus when click in label and", () => {
    render(<Input name="foo" label="bar" />);

    const input = document.querySelector("input");
    const label = screen.getByLabelText("bar");

    expect(input).not.toHaveFocus();

    userEvent.click(label);

    expect(input).toHaveFocus();
  });
});
