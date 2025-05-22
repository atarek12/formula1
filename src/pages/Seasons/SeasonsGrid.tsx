import React from "react";
import type { IGetSeasonsResponse } from "~/API";

interface SeasonsGridProps {
  data: IGetSeasonsResponse;
}

export const SeasonsGrid: React.FC<SeasonsGridProps> = ({}) => {
  return "grid";
};
