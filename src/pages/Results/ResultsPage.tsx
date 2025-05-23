import React from "react";
import { useParams } from "react-router-dom";
import { useGetRaceResults } from "~/API";
import { ErrorMessage, PageLoading, Pagination } from "~/components";
import { useViewContext, ViewEnum } from "~/context";
import { usePagination } from "~/helpers";
import { ResultsGrid } from "./ResultsGrid";
import { ResultsList } from "./ResultsList";

interface ResultsPageProps {}

export const ResultsPage: React.FC<ResultsPageProps> = ({}) => {
  const [view] = useViewContext();
  const { currentPage, limit, offset, setPage, setPageSize } = usePagination();
  const params = useParams();
  const season = params.seasonId || "";
  const round = params.roundId || "";
  const { data, isLoading, error } = useGetRaceResults({
    limit,
    offset,
    season,
    round,
  });

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div>
      <h1>Season Results</h1>
      <Pagination
        totalItems={data?.total}
        pageSize={limit}
        currentPage={currentPage}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
      {isLoading ? (
        <PageLoading />
      ) : !data ? (
        <ErrorMessage message="No data available" />
      ) : view === ViewEnum.GRID ? (
        <ResultsGrid data={data} />
      ) : (
        <ResultsList data={data} />
      )}
    </div>
  );
};
