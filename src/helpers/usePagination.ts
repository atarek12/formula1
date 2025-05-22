import { useSearchParams } from "react-router-dom";

export function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 30;

  const setPage = (page: number) => {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  };

  const setPageSize = (size: number) => {
    searchParams.set("pageSize", String(size));
    setSearchParams(searchParams);
  };

  const offset = pageSize * (currentPage - 1);
  const limit = pageSize;

  return { currentPage, pageSize, offset, limit, setPage, setPageSize };
}
