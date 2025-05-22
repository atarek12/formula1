import { makeStyles, Skeleton, SkeletonItem } from "@fluentui/react-components";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "16px",
  },
});

interface GridSkeletonProps {
  count?: number;
}

export const GridSkeleton: React.FC<GridSkeletonProps> = ({ count = 10 }) => {
  const styles = useStyles();
  const data = [...new Array(count)] as undefined[];

  return (
    <div className={styles.root}>
      {data.map((_, i) => (
        // eslint-disable-next-line react-x/no-array-index-key
        <Skeleton key={i} aria-label="Loading Content">
          <SkeletonItem size={72} />
        </Skeleton>
      ))}
    </div>
  );
};
