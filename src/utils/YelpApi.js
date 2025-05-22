import { useState, useEffect } from "react";
import { YELP_BUSINESS_URL } from "./constants";
import queryString from "query-string";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
  },
};

/**
 * Calls into the Yelp API every time one of the args changes.
 * @param {string} location address of office
 * @param {number} offset offset for pagination
 * @param {"best_match" | "rating" | "review_count" | "distance" | undefined} sortBy how results are sorted
 * @returns [loading, businesses] where loading is true when we're waiting for the response and
 * businesses is the api response
 */
export function useBusinessSearch(location, offset, sortBy) {
  const categories = "bubbletea";
  const radius = "10000";

  const query = queryString.stringify({
    location,
    categories,
    offset,
    sort_by: sortBy,
    radius,
  });

  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);

  // get businesses
  useEffect(() => {
    if (location !== undefined) {
      setLoading(true);
      fetch(`${YELP_BUSINESS_URL}?${query}`, options)
        .then((res) => res.json())
        .then((res) => {
          setLoading(false);
          setBusinesses(res.businesses);
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    }
  }, [location, offset, sortBy]);

  return [loading, businesses];
}
