import React from "react";
import { useGetSeasons } from "~/API";
import { ErrorMessage, TableSkeleton } from "~/components";
import { useViewContext, ViewEnum } from "~/context";
import { SeasonsGrid } from "./SeasonsGrid";
import { SeasonsList } from "./SeasonsList";

interface SeasonsProps {}

export const Seasons: React.FC<SeasonsProps> = () => {
  const [view] = useViewContext();
  const { data, isLoading, error } = useGetSeasons({});

  if (isLoading) {
    return <TableSkeleton columnHeaders={["Season", "Wiki"]} />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div>
      {view === ViewEnum.GRID ? (
        <SeasonsGrid data={data} />
      ) : (
        <SeasonsList data={data} />
      )}
    </div>
  );
};
