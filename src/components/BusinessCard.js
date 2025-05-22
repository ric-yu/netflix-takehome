import { MILES_IN_METER } from "../utils/constants";
import styles from "./BusinessCards.module.css";

/**
 * @param {object} props
 * @param {object} props.business the business we're displaying
 * @returns a card with the business's image, name, rating, and distance
 */
function BusinessCard(props) {
  const { business } = props;

  let distance_miles = business.distance * MILES_IN_METER;
  distance_miles = Math.round(distance_miles * 100) / 100; // round to two decimals
  return (
    <div key={business.id} className={styles["business-card"]}>
      {business.image_url && (
        <img
          className={styles["business-image"]}
          src={business.image_url}
          alt={business.alt}
        />
      )}
      <span className={styles["business-text"]}>
        {business.name}
        <br />
        Rating: {business.rating}/5
        <br />
        Distance: {distance_miles} miles
      </span>
    </div>
  );
}

export default BusinessCard;
