import OffsetButtons from "../OffsetButtons";
import { render, screen } from "@testing-library/react";

const mockIncrement = () => {};
const mockDecrement = () => {};

test("renders buttons", () => {
  render(
    <OffsetButtons
      offset={0}
      incrementOffset={mockIncrement}
      decrementOffset={mockDecrement}
    />,
  );

  let buttonText = screen.getByText("next");
  expect(buttonText).toBeInTheDocument();

  buttonText = screen.getByText("previous");
  expect(buttonText).toBeInTheDocument();
});

test("disables 'previous' if offset is 0", () => {
  render(
    <OffsetButtons
      offset={0}
      incrementOffset={mockIncrement}
      decrementOffset={mockDecrement}
    />,
  );

  const button = screen.getByText("previous").closest("button");
  expect(button).toHaveAttribute("disabled");
});

test("enables 'previous' if offset is not 0", () => {
  render(
    <OffsetButtons
      offset={10}
      incrementOffset={mockIncrement}
      decrementOffset={mockDecrement}
    />,
  );

  const button = screen.getByText("previous").closest("button");
  expect(button).not.toHaveAttribute("disabled");
});
