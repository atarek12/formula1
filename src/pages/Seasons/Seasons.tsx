import React from "react";
import { useGetSeasons } from "../../API";

interface SeasonsProps {}

export const Seasons: React.FC<SeasonsProps> = () => {
  const { data, isLoading, isError } = useGetSeasons({});

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading seasons</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }

  return <div>Seasons</div>;
};
