import Button from "./Button";

/**
 *
 * @param {object} props
 * @returns buttons that let you choose how search results are sorted
 */
function SortBySelector(props) {
  const { sortBy, sortByOnclick } = props;

  const ratingButton = (
    <Button selected={sortBy === "rating"} onClick={sortByOnclick("rating")}>
      Sort by rating
    </Button>
  );
  const distanceButton = (
    <Button
      selected={sortBy === "distance"}
      onClick={sortByOnclick("distance")}
    >
      Sort by distance
    </Button>
  );

  const defaultButton = (
    <Button
      selected={sortBy == null || sortBy === "best_match"}
      onClick={sortByOnclick("best_match")}
    >
      Default sort
    </Button>
  );

  return (
    <div>
      {ratingButton}
      {distanceButton}
      {defaultButton}
    </div>
  );
}

export default SortBySelector;
