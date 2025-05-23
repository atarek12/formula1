import React from "react";
import { useViewContext, ViewEnum } from "~/context";
import { useIsMobile } from "~/helpers";

interface GridOrListProps {
  gridElement: React.ReactNode;
  listElement: React.ReactNode;
}

export const GridOrList: React.FC<GridOrListProps> = ({
  gridElement,
  listElement,
}) => {
  const [view] = useViewContext();
  const isMobile = useIsMobile();

  if (isMobile || view === ViewEnum.GRID) {
    return gridElement;
  }

  return listElement;
};
