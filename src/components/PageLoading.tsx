import React from "react";
import { TableSkeleton } from "./TableSkeleton";
import { useViewContext, ViewEnum } from "~/context";
import { GridSkeleton } from "./GridSkeleton";

interface PageLoadingProps {}

export const PageLoading: React.FC<PageLoadingProps> = ({}) => {
  const [view] = useViewContext();

  return (
    <div>{view === ViewEnum.GRID ? <GridSkeleton /> : <TableSkeleton />}</div>
  );
};
