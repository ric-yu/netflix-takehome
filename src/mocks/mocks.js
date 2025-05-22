import queryString from "query-string";

export const BusinessResponseMock = {
  businesses: [
    {
      name: "Foo business",
      image_url: "img.com/foo",
      rating: 3,
      distance: 100,
      id: 1,
    },
    {
      name: "Bar business",
      image_url: "img.com/bar",
      rating: 4,
      distance: 150,
      id: 2,
    },
    {
      name: "Baz business",
      image_url: "img.com/baz",
      rating: 5,
      distance: 200,
      id: 3,
    },
  ],
};

export function getQuery(location, offset = 0, sortBy = undefined) {
  const categories = "bubbletea";
  const radius = "10000";

  return queryString.stringify({
    location,
    categories,
    offset,
    sort_by: sortBy,
    radius,
  });
}
