import {
  makeStyles,
  mergeClasses,
  tokens,
  Tooltip,
} from "@fluentui/react-components";
import React from "react";
import { useViewContext, ViewEnum } from "~/context";

const useStyles = makeStyles({
  root: {
    position: "relative",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    borderRadius: "8px",
    backgroundColor: tokens.colorNeutralBackground1,
    padding: "4px",
    boxShadow: `0 1px 2px ${tokens.colorNeutralShadowAmbient}`,
    ":focus-visible": {
      outline: `2px solid ${tokens.colorNeutralForeground1}`,
      outlineOffset: "2px",
    },
  },
  label: {
    borderRadius: "8px",
    padding: "8px 12px",
    fontSize: "14px",
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    zIndex: 2,
    transition: "color 0.2s ease-in-out",
  },
  labelSelected: {
    color: tokens.colorNeutralForegroundOnBrand,
  },
  selectedIndicator: {
    position: "absolute",
    width: "46px",
    height: "36px",
    top: "4px",
    left: "4px",
    zIndex: 1,
    borderRadius: "8px",
    backgroundColor: tokens.colorBrandBackground,
    transition: "left 0.2s ease-in-out",
  },
  rightSelected: {
    left: "calc(100% - 52px)",
  },
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    margin: "-1px",
    padding: "0",
    border: "0",
    clip: "rect(0, 0, 0, 0)",
    overflow: "hidden",
  },
});

interface SwitchViewProps {}

export const SwitchView: React.FC<SwitchViewProps> = ({}) => {
  const styles = useStyles();
  const [view, setView] = useViewContext();

  const toggleView = () => {
    const newView = view === ViewEnum.GRID ? ViewEnum.LIST : ViewEnum.GRID;
    setView(newView);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleView();
    }
  };

  const handleClick = () => {
    toggleView();
  };

  return (
    <Tooltip
      content="Toggle view between list and grid"
      relationship="label"
      positioning="below"
    >
      <div
        className={styles.root}
        tabIndex={0}
        role="radiogroup"
        onKeyDown={handleKeyDown}
        onClick={handleClick}
      >
        <div
          className={mergeClasses(
            styles.label,
            view === ViewEnum.LIST && styles.labelSelected,
          )}
          role="radio"
          aria-checked={view === ViewEnum.LIST}
        >
          List
        </div>
        <div
          className={mergeClasses(
            styles.label,
            view === ViewEnum.GRID && styles.labelSelected,
          )}
          role="radio"
          aria-checked={view === ViewEnum.GRID}
        >
          Grid
        </div>
        <div
          className={mergeClasses(
            styles.selectedIndicator,
            view === ViewEnum.GRID && styles.rightSelected,
          )}
        />
        <span className={styles.srOnly} aria-live="polite" aria-atomic="true">
          Current view is: {view === ViewEnum.GRID ? "Grid view" : "List view"}
        </span>
      </div>
    </Tooltip>
  );
};
