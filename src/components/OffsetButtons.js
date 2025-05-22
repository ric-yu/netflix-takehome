import Button from "./Button";

/**
 *
 * @param {object} props
 * @param {number} offset our current offset for the Boba business search
 * @returns buttons to adjust your offset - the "previous" button is disabled if we are at offset 0
 */
function OffsetButtons(props) {
  const { offset, incrementOffset, decrementOffset } = props;

  const nextButton = <button onClick={incrementOffset}>next</button>;
  const prevButton = (
    <Button onClick={decrementOffset} disabled={offset === 0}>
      previous
    </Button>
  );

  return (
    <div>
      {prevButton}
      {nextButton}
    </div>
  );
}

export default OffsetButtons;
