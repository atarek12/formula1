import { makeStyles, tokens } from "@fluentui/react-components";
import React from "react";
import { SwitchView } from "./SwitchView";
import { AppBreadcrumbs } from "./AppBreadcrumbs";

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  header: {
    backgroundColor: tokens.colorBrandBackground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    boxShadow: `0 1px 2px ${tokens.colorNeutralShadowAmbient}`,
  },
  title: {
    display: "flex",
    alignItems: "center",
    gap: "40px",
  },
  logo: {
    fontSize: "2rem",
    fontStyle: "italic",
    fontFamily: "fantasy",
  },
  main: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
});

interface AppWrapperProps {
  children: React.ReactNode;
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.title}>
            <span className={styles.logo}>F1</span>
            <AppBreadcrumbs />
          </div>
          <SwitchView />
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};
