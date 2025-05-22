/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */

import {
  Link as FluentUiLink,
  type LinkProps,
  makeStyles,
} from "@fluentui/react-components";
import { Link, type To } from "react-router-dom";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
  },
});

export type FluentLinkProps = Omit<LinkProps, "href"> & {
  to: To;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

/**
 * A fluent ui link wrapped with a react-router link.
 * Accepts all props of a fluent ui link except href.
 * And adds a `to` prop for the react-router link.
 */
export const FluentLink = ({
  ref,
  to,
  onClick,
  ...props
}: FluentLinkProps & { ref?: React.RefObject<HTMLAnchorElement | null> }) => {
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
      <FluentUiLink as="span" role="none" tabIndex={-1} {...props} />
    </Link>
  );
};

FluentLink.displayName = "FluentLink";
