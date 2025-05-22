import { useState } from "react";
import {
  NETFLIX_OFFICE_ADDRESSES,
  NETFLIX_OFFICE_NAMES,
} from "../utils/constants";
import Button from "./Button";

/**
 *
 * @param {object} props
 * @returns a button for each of Netflix's offices that let you choose a location for the API request
 */
function OfficeSelector(props) {
  const { selectorOnClick } = props;

  // used to disable the button for the office currently selected
  const [selectedOffice, setSelectedOffice] = useState();

  const buttons = Object.keys(NETFLIX_OFFICE_ADDRESSES).map((office) => (
    <Button
      key={office}
      selected={selectedOffice === office}
      onClick={() => {
        const setOffice = selectorOnClick(office);
        setSelectedOffice(office);
        setOffice();
      }}
    >
      {NETFLIX_OFFICE_NAMES[office]}
    </Button>
  ));

  return (
    <div>
      <h1>Choose a Netflix office</h1>
      {buttons}
    </div>
  );
}

export default OfficeSelector;
