import BusinessCard from "./BusinessCard";
import SortBySelector from "./SortBySelector";
import OffsetButtons from "./OffsetButtons";

/**
 *
 * @param {object} props
 * @returns a component with each Boba business's information and some buttons to sort or see more businesses
 */
function BusinessInfo(props) {
  const {
    sortBy,
    sortByOnclick,
    incrementOffset,
    decrementOffset,
    businesses,
    offset,
  } = props;

  return (
    <div>
      {businesses.length ? (
        <>
          <h3>Nearby Boba businesses</h3>
          <SortBySelector sortBy={sortBy} sortByOnclick={sortByOnclick} />
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
          <OffsetButtons
            offset={offset}
            incrementOffset={incrementOffset}
            decrementOffset={decrementOffset}
          />
        </>
      ) : null}
    </div>
  );
}

export default BusinessInfo;
