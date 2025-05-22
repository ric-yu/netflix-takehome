import SortBySelector from "../SortBySelector";
import { render, screen } from "@testing-library/react";

const mockOnClick = () => () => {};

test("renders buttons", () => {
  render(<SortBySelector sortByOnclick={mockOnClick} />);

  let buttonText = screen.getByText("Sort by rating");
  expect(buttonText).toBeInTheDocument();

  buttonText = screen.getByText("Sort by distance");
  expect(buttonText).toBeInTheDocument();

  buttonText = screen.getByText("Default sort");
  expect(buttonText).toBeInTheDocument();
});

test("disables 'default' if no sort_by is selected", () => {
  render(<SortBySelector sortByOnclick={mockOnClick} />);

  const button = screen.getByText("Default sort").closest("button");
  expect(button).toHaveAttribute("disabled");
});

test("disables 'rating' if currently sorting by rating", () => {
  render(<SortBySelector sortByOnclick={mockOnClick} sortBy="rating" />);

  const button = screen.getByText("Sort by rating").closest("button");
  expect(button).toHaveAttribute("disabled");
});

test("disables 'distance' if currently sorting by distance", () => {
  render(<SortBySelector sortByOnclick={mockOnClick} sortBy="distance" />);

  const button = screen.getByText("Sort by distance").closest("button");
  expect(button).toHaveAttribute("disabled");
});

test("disables 'default' if currently sorting by best_match", () => {
  render(<SortBySelector sortByOnclick={mockOnClick} sortBy="best_match" />);

  const button = screen.getByText("Default sort").closest("button");
  expect(button).toHaveAttribute("disabled");
});
