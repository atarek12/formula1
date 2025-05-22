import { Skeleton, SkeletonItem } from "@fluentui/react-components";
import React from "react";
import { Grid } from "./Grid";

interface GridSkeletonProps {
  count?: number;
}

export const GridSkeleton: React.FC<GridSkeletonProps> = ({ count = 10 }) => {
  const data = [...new Array(count)] as undefined[];

  return (
    <Grid>
      {data.map((_, i) => (
        // eslint-disable-next-line react-x/no-array-index-key
        <Skeleton key={i} aria-label="Loading Content">
          <SkeletonItem size={72} />
        </Skeleton>
      ))}
    </Grid>
  );
};
