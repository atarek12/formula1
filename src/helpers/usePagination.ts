import { useSearchParams } from "react-router-dom";
import { LocalStorageKeys, QueryParams } from "./const";

const KEY = LocalStorageKeys.PREFERRED_PAGE_SIZE;
const DEFAULT_PAGE_SIZE = 20;

export function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const storagePageSize = localStorage.getItem(KEY);
  const pageSizeFromStorage = storagePageSize
    ? Number(storagePageSize)
    : DEFAULT_PAGE_SIZE;
  const currentPage = Number(searchParams.get(QueryParams.PAGE)) || 1;
  const pageSize =
    Number(searchParams.get(QueryParams.PAGE_SIZE)) || pageSizeFromStorage;

  const setPage = (page: number) => {
    searchParams.set(QueryParams.PAGE, String(page));
    setSearchParams(searchParams);
  };

  const setPageSize = (size: number) => {
    searchParams.set(QueryParams.PAGE_SIZE, String(size));
    localStorage.setItem(KEY, String(size));
    setSearchParams(searchParams);
  };

  const offset = pageSize * (currentPage - 1);
  const limit = pageSize;

  return { currentPage, pageSize, offset, limit, setPage, setPageSize };
}
