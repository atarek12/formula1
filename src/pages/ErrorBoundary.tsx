import { makeStyles, tokens } from "@fluentui/react-components";
import React from "react";
import { useRouteError } from "react-router-dom";
import { FluentLink } from "~/components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "calc(100vh - 200px)",
  },
  header: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "1.25rem",
    marginBottom: "1rem",
    color: tokens.colorStatusDangerForeground1,
  },
});

interface ErrorBoundaryProps {}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({}) => {
  const styles = useStyles();
  const error = useRouteError();

  return (
    <div className={styles.root}>
      <h1 className={styles.header}>Application Error</h1>
      <p className={styles.text}>
        {error instanceof Error ? error.message : String(error)}
      </p>
      <FluentLink to="/">Go back to home</FluentLink>
    </div>
  );
};
