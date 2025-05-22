import { render, screen } from "@testing-library/react";
import App from "../App";
import { BusinessResponseMock, getQuery } from "../mocks/mocks";
import { act } from "react";
import {
  NETFLIX_OFFICE_ADDRESSES,
  YELP_BUSINESS_URL,
} from "../utils/constants";
import { options } from "../utils/YelpApi";

beforeEach(() => {
  fetch.resetMocks();
});

test("renders office selector", () => {
  render(<App />);

  const text = screen.getByText("Choose a Netflix office");
  expect(text).toBeInTheDocument();

  const losGatosButton = screen.getByText("Los Gatos");
  expect(losGatosButton).toBeInTheDocument();

  const newYorkButton = screen.getByText("New York");
  expect(newYorkButton).toBeInTheDocument();

  const losAngelesButton = screen.getByText("Los Angeles");
  expect(losAngelesButton).toBeInTheDocument();
});

test("renders business info when office is selected", async () => {
  render(<App />);

  fetch.mockResponseOnce(JSON.stringify(BusinessResponseMock));

  // Business info is not initially visible
  let text = screen.queryByText("Nearby Boba businesses");
  expect(text).toBeNull();

  // Selecting an office...
  await act(() => {
    const losGatosButton = screen.getByText("Los Gatos");
    losGatosButton.click();
  });

  const expectedQuery = getQuery(NETFLIX_OFFICE_ADDRESSES["losGatos"]);

  // ...should send an API requst to Yelp...
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `${YELP_BUSINESS_URL}?${expectedQuery}`,
    options,
  );

  // ...and we should show Business info once we get a valid response.
  text = screen.getByText("Nearby Boba businesses");
  expect(text).toBeInTheDocument();
});

test("does not render business info if API request fails", async () => {
  render(<App />);

  fetch.mockReject(new Error("foo"));

  // Business info is not initially visible
  let text = screen.queryByText("Nearby Boba businesses");
  expect(text).toBeNull();

  // Selecting an office...
  await act(() => {
    const losGatosButton = screen.getByText("Los Gatos");
    losGatosButton.click();
  });

  const expectedQuery = getQuery(NETFLIX_OFFICE_ADDRESSES["losGatos"]);

  // ...should send an API requst to Yelp...
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `${YELP_BUSINESS_URL}?${expectedQuery}`,
    options,
  );

  // ...but we should still not see the business infos
  text = screen.queryByText("Nearby Boba businesses");
  expect(text).not.toBeInTheDocument();
});

test("updates businesses when selecting another office", async () => {
  render(<App />);

  fetch.mockResponse(JSON.stringify(BusinessResponseMock));

  // Click on Los Gatos to get initial Business results
  await act(() => {
    const losGatosButton = screen.getByText("Los Gatos");
    losGatosButton.click();
  });

  // Click on New York to try to get new results - should be another API request
  await act(() => {
    const newYorkButton = screen.getByText("New York");
    newYorkButton.click();
  });

  const expectedQueryLosGatos = getQuery(NETFLIX_OFFICE_ADDRESSES["losGatos"]);
  const expectedQueryNewYork = getQuery(NETFLIX_OFFICE_ADDRESSES["newYork"]);

  expect(fetch).toHaveBeenCalledTimes(2);

  // We should first fetch Los Gatos businesses...
  expect(fetch).toHaveBeenNthCalledWith(
    1,
    `${YELP_BUSINESS_URL}?${expectedQueryLosGatos}`,
    options,
  );

  // ...then New York businesses.
  expect(fetch).toHaveBeenNthCalledWith(
    2,
    `${YELP_BUSINESS_URL}?${expectedQueryNewYork}`,
    options,
  );
});

test("updates businesses when selecting a 'sort by' option", async () => {
  render(<App />);

  fetch.mockResponse(JSON.stringify(BusinessResponseMock));

  // Click on Los Gatos to get initial Business results
  await act(() => {
    const losGatosButton = screen.getByText("Los Gatos");
    losGatosButton.click();
  });

  // Click on "Sort by rating" to try to get sorted results - should send another API request
  await act(() => {
    const sortByRatingButton = screen.getByText("Sort by rating");
    sortByRatingButton.click();
  });

  const expectedQueryNoSort = getQuery(NETFLIX_OFFICE_ADDRESSES["losGatos"]);
  const expectedQueryWithSort = getQuery(
    NETFLIX_OFFICE_ADDRESSES["losGatos"],
    0,
    "rating",
  );

  expect(fetch).toHaveBeenCalledTimes(2);

  // We should first send a request that does not specify "sort_by"...
  expect(fetch).toHaveBeenNthCalledWith(
    1,
    `${YELP_BUSINESS_URL}?${expectedQueryNoSort}`,
    options,
  );

  // ...and then send a request that does specify "sort_by"
  expect(fetch).toHaveBeenNthCalledWith(
    2,
    `${YELP_BUSINESS_URL}?${expectedQueryWithSort}`,
    options,
  );
});

test("updates businesses when selecting updating pages", async () => {
  render(<App />);

  fetch.mockResponse(JSON.stringify(BusinessResponseMock));

  // Click on Los Gatos to get initial Business results...
  await act(() => {
    const losGatosButton = screen.getByText("Los Gatos");
    losGatosButton.click();
  });

  // ...then navigate to the next page...
  await act(() => {
    const nextButton = screen.getByText("next");
    nextButton.click();
  });

  // ...then navigate back to the previous page...
  await act(() => {
    const prevButton = screen.getByText("previous");
    prevButton.click();
  });

  const expectedQueryZeroOffset = getQuery(
    NETFLIX_OFFICE_ADDRESSES["losGatos"],
    0,
  );
  const expectedQueryTwentyOffset = getQuery(
    NETFLIX_OFFICE_ADDRESSES["losGatos"],
    20,
  );

  expect(fetch).toHaveBeenCalledTimes(3);

  // We begin at 0 offset...
  expect(fetch).toHaveBeenNthCalledWith(
    1,
    `${YELP_BUSINESS_URL}?${expectedQueryZeroOffset}`,
    options,
  );

  // ...update our offset to 20 after hitting "next"...
  expect(fetch).toHaveBeenNthCalledWith(
    2,
    `${YELP_BUSINESS_URL}?${expectedQueryTwentyOffset}`,
    options,
  );

  // ...and then set offset back to 0 after hitting "previous"
  expect(fetch).toHaveBeenNthCalledWith(
    3,
    `${YELP_BUSINESS_URL}?${expectedQueryZeroOffset}`,
    options,
  );
});
