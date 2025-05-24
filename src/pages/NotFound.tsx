import { makeStyles } from "@fluentui/react-components";
import React from "react";
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
  },
});

interface NotFoundProps {}

export const NotFound: React.FC<NotFoundProps> = ({}) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <h1 className={styles.header}>404 - Not Found</h1>
      <p className={styles.text}>
        The page you are looking for does not exist.
      </p>
      <FluentLink to="/">Go back to home</FluentLink>
    </div>
  );
};
