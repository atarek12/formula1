import {
  BreadcrumbButton,
  makeStyles,
  type BreadcrumbButtonProps,
} from "@fluentui/react-components";
import { Link, type To } from "react-router-dom";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
  },
});

export type BreadcrumbButtonLinkProps = Omit<BreadcrumbButtonProps, "href"> & {
  to: To;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export const BreadcrumbButtonLink = ({
  ref,
  to,
  onClick,
  ...props
}: BreadcrumbButtonLinkProps & {
  ref?: React.RefObject<HTMLAnchorElement | null>;
}) => {
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
      <BreadcrumbButton
        role="none"
        data-testid="breadcrumb-link"
        tabIndex={-1}
        {...props}
      />
    </Link>
  );
};

BreadcrumbButtonLink.displayName = "BreadcrumbButtonLink";
