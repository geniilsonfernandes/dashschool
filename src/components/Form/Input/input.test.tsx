import React from "react";
import { render, screen } from "@testing-library/react";
import { Input } from ".";

describe("Input", () => {
  it("Input should render", () => {
    render(<Input name="foo" label="bar" />);
    const input = document.querySelector("input");

    screen.debug();

    const label = screen.getByLabelText("bar");

    expect(label).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "foo");
  });
});
