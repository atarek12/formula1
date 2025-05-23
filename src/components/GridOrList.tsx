import React from "react";
import { useMediaQuery } from "usehooks-ts";
import { useViewContext, ViewEnum } from "~/context";

interface GridOrListProps {
  gridElement: React.ReactNode;
  listElement: React.ReactNode;
}

export const GridOrList: React.FC<GridOrListProps> = ({
  gridElement,
  listElement,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [view] = useViewContext();

  if (isMobile || view === ViewEnum.GRID) {
    return gridElement;
  }

  return listElement;
};
