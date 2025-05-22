import OfficeSelector from "../OfficeSelector";
import { render, screen } from "@testing-library/react";
import { act } from "react";

const mockOnClick = () => () => {};

test("renders buttons", () => {
  render(<OfficeSelector selectorOnClick={mockOnClick} />);

  let buttonText = screen.getByText("Los Gatos");
  expect(buttonText).toBeInTheDocument();

  buttonText = screen.getByText("New York");
  expect(buttonText).toBeInTheDocument();

  buttonText = screen.getByText("Los Angeles");
  expect(buttonText).toBeInTheDocument();
});

test("disables the selected button", async () => {
  render(<OfficeSelector selectorOnClick={mockOnClick} />);

  // Click on each button and check if they are disabled
  const buttonTexts = ["Los Gatos", "New York", "Los Angeles"];
  for (const buttonText of buttonTexts) {
    const textField = screen.getByText(buttonText);
    let button = textField.closest("button");
    expect(button).not.toHaveAttribute("disabled");

    await act(() => {
      button.click();
    });

    button = textField.closest("button");
    expect(button).toHaveAttribute("disabled");
  }
});
