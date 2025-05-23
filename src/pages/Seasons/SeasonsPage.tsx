import React from "react";
import { useGetSeasons } from "~/API";
import { ErrorMessage, PageLoading, Pagination } from "~/components";
import { useViewContext, ViewEnum } from "~/context";
import { SeasonsGrid } from "./SeasonsGrid";
import { SeasonsList } from "./SeasonsList";
import { usePagination } from "~/helpers";

interface SeasonsPageProps {}

export const SeasonsPage: React.FC<SeasonsPageProps> = () => {
  const [view] = useViewContext();
  const { currentPage, limit, offset, setPage, setPageSize } = usePagination();
  const { data, isLoading, error } = useGetSeasons({ limit, offset });

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div>
      <h1>All Seasons</h1>
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
        <SeasonsGrid data={data} />
      ) : (
        <SeasonsList data={data} />
      )}
    </div>
  );
};
