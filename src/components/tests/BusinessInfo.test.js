import { BusinessResponseMock } from "../../mocks/mocks";
import BusinessInfo from "../BusinessInfo";
import { render, screen } from "@testing-library/react";

const mockProps = {
  sortBy: undefined,
  sortByOnclick: () => {},
  incrementOffset: () => {},
  decrementOffset: () => {},
  offset: 0,
};

test("renders header text", () => {
  render(
    <BusinessInfo
      businesses={BusinessResponseMock.businesses}
      sortBy={mockProps.sortBy}
      sortByOnclick={mockProps.sortByOnclick}
      incrementOffset={mockProps.incrementOffset}
      decrementOffset={mockProps.decrementOffset}
      offset={mockProps.offset}
    />,
  );

  const text = screen.getByText("Nearby Boba businesses");
  expect(text).toBeInTheDocument();
});

test("renders sort by selector", () => {
  render(
    <BusinessInfo
      businesses={BusinessResponseMock.businesses}
      sortBy={mockProps.sortBy}
      sortByOnclick={mockProps.sortByOnclick}
      incrementOffset={mockProps.incrementOffset}
      decrementOffset={mockProps.decrementOffset}
      offset={mockProps.offset}
    />,
  );

  let buttonText = screen.getByText("Sort by rating");
  expect(buttonText).toBeInTheDocument();

  buttonText = screen.getByText("Sort by distance");
  expect(buttonText).toBeInTheDocument();

  buttonText = screen.getByText("Default sort");
  expect(buttonText).toBeInTheDocument();
});

test("renders business cards", () => {
  render(
    <BusinessInfo
      businesses={BusinessResponseMock.businesses}
      sortBy={mockProps.sortBy}
      sortByOnclick={mockProps.sortByOnclick}
      incrementOffset={mockProps.incrementOffset}
      decrementOffset={mockProps.decrementOffset}
      offset={mockProps.offset}
    />,
  );

  BusinessResponseMock.businesses.forEach((business) => {
    const name = screen.getByText(business.name, { exact: false });
    expect(name).toBeInTheDocument();

    const rating = screen.getByText(`${business.rating}/5`, { exact: false });
    expect(rating).toBeInTheDocument();
  });
});

test("renders offset buttons", () => {
  render(
    <BusinessInfo
      businesses={BusinessResponseMock.businesses}
      sortBy={mockProps.sortBy}
      sortByOnclick={mockProps.sortByOnclick}
      incrementOffset={mockProps.incrementOffset}
      decrementOffset={mockProps.decrementOffset}
      offset={mockProps.offset}
    />,
  );

  let buttonText = screen.getByText("previous");
  expect(buttonText).toBeInTheDocument();

  buttonText = screen.getByText("next");
  expect(buttonText).toBeInTheDocument();
});
