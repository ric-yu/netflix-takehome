import styles from "./Button.module.css";

/**
 *
 * @param {object} props
 * @param {boolean} props.selected if we've selected this button, we will disable it
 * @returns a button with some basic styling
 */
function Button(props) {
  const { selected, onClick, disabled, children } = props;

  return (
    <button
      className={styles["button"]}
      onClick={onClick}
      disabled={selected ? true : disabled}
    >
      {children}
    </button>
  );
}

export default Button;
