import React from "react";
import { useParams } from "react-router-dom";
import { useGetSeasonRaces } from "~/API";
import {
  ErrorMessage,
  GridOrList,
  PageLoading,
  Pagination,
} from "~/components";
import { usePagination } from "~/helpers";
import { RacesGrid } from "./RacesGrid";
import { RacesList } from "./RacesList";
import { useGetSortedRaces } from "~/helpers";

interface RacesPageProps {}

export const RacesPage: React.FC<RacesPageProps> = ({}) => {
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
    <div data-testid="races-page">
      <h1>All Races</h1>
      <Pagination
        totalItems={sortedData?.total}
        pageSize={limit}
        currentPage={currentPage}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
      {isLoading ? (
        <PageLoading />
      ) : !sortedData ? (
        <ErrorMessage message="No data available" />
      ) : (
        <GridOrList
          gridElement={<RacesGrid data={sortedData} />}
          listElement={<RacesList data={sortedData} />}
        />
      )}
    </div>
  );
};
