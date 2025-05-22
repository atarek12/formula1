import React from "react";
import { useParams } from "react-router-dom";
import { useGetSeasonRaces } from "~/API";
import { ErrorMessage, PageLoading, Pagination } from "~/components";
import { useViewContext, ViewEnum } from "~/context";
import { usePagination } from "~/helpers";
import { RacesGrid } from "./RacesGrid";
import { RacesList } from "./RacesList";
import { useGetSortedRaces } from "~/helpers/useGetSortedRaces";

interface RacesPageProps {}

export const RacesPage: React.FC<RacesPageProps> = ({}) => {
  const [view] = useViewContext();
  const { currentPage, limit, offset, setPage, setPageSize } = usePagination();
  const params = useParams();
  const season = params.seasonId || "";
  const { data, isLoading, error } = useGetSeasonRaces({
    season,
    limit,
    offset,
  });

  const sortedData = useGetSortedRaces(data);

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div>
      <h1>All Races</h1>
      <Pagination
        totalItems={sortedData?.total}
        pageSize={sortedData?.limit}
        currentPage={currentPage}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
      {isLoading ? (
        <PageLoading />
      ) : !sortedData ? (
        <ErrorMessage message="No data available" />
      ) : view === ViewEnum.GRID ? (
        <RacesGrid data={sortedData} />
      ) : (
        <RacesList data={sortedData} />
      )}
    </div>
  );
};
