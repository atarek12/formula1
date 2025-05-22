import { makeStyles } from "@fluentui/react-components";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "16px",
  },
});

interface GridProps {
  children: React.ReactNode;
}

export const Grid: React.FC<GridProps> = ({ children }) => {
  const styles = useStyles();
  return <div className={styles.root}>{children}</div>;
};
