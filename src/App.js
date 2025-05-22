import { useCallback, useState } from "react";
import BusinessInfo from "./components/BusinessInfo";
import { useBusinessSearch } from "./utils/YelpApi";
import OfficeSelector from "./components/OfficeSelector";
import { NETFLIX_OFFICE_ADDRESSES } from "./utils/constants";

/**
 * @returns our beautiful Boba business search app :)
 */
function App() {
  const [location, setLocation] = useState();
  const [sortBy, setSortBy] = useState();
  const [offset, setOffset] = useState(0);

  const [loading, businesses] = useBusinessSearch(location, offset, sortBy);

  // Allows users to select an office
  const selectorOnClick = useCallback(
    (office) => () => setLocation(NETFLIX_OFFICE_ADDRESSES[office]),
    [],
  );

  // Props drilled into BusinessInfo's children
  const incrementOffset = () => setOffset(offset + 20);
  const decrementOffset = () => setOffset(offset - 20);
  const sortByOnclick = useCallback((sortBy) => () => setSortBy(sortBy), []);

  return (
    <div>
      <OfficeSelector selectorOnClick={selectorOnClick} />
      {loading ? (
        "loading..."
      ) : (
        <BusinessInfo
          sortBy={sortBy}
          offset={offset}
          incrementOffset={incrementOffset}
          decrementOffset={decrementOffset}
          sortByOnclick={sortByOnclick}
          businesses={businesses}
        />
      )}
    </div>
  );
}

export default App;
