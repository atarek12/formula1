import { useSearchParams } from "react-router-dom";

const KEY = "PREFERRED_PAGE_SIZE";

export function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const storagePageSize = localStorage.getItem(KEY);
  const pageSizeFromStorage = storagePageSize ? Number(storagePageSize) : 30;
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || pageSizeFromStorage;

  const setPage = (page: number) => {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  };

  const setPageSize = (size: number) => {
    searchParams.set("pageSize", String(size));
    localStorage.setItem(KEY, String(size));
    setSearchParams(searchParams);
  };

  const offset = pageSize * (currentPage - 1);
  const limit = pageSize;

  return { currentPage, pageSize, offset, limit, setPage, setPageSize };
}
