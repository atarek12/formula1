import {
  Button,
  type ButtonProps,
  makeStyles,
} from "@fluentui/react-components";
import { Link, type To } from "react-router";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
  },
});

export type ButtonLinkProps = Omit<ButtonProps, "href"> & {
  to: To;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

/**
 * A fluent ui button wrapped with a react-router link.
 * Accepts all props of a fluent ui button except href.
 * And adds a `to` prop for the react-router link.
 */
export const ButtonLink = ({
  ref,
  to,
  onClick,
  ...props
}: ButtonLinkProps & { ref?: React.RefObject<HTMLAnchorElement | null> }) => {
  const styles = useStyles();

  const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    if (props.disabled) {
      e.preventDefault();
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link
      ref={ref}
      to={to}
      className={styles.link}
      aria-disabled={props.disabled}
      onClick={handleOnClick}
    >
      <Button as="span" role="none" tabIndex={-1} {...props} />
    </Link>
  );
};

ButtonLink.displayName = "ButtonLink";
