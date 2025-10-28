import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";

interface Pagination {
  current: number;
  total: number;
}

type FetcherResponse<Item> = {
  items: Item[];
  pagination: Pagination;
};

interface UseInfiniteScrollProps<Item> {
  fetcher: (page: number) => Promise<FetcherResponse<Item> | null>;
  startPage?: number;
  initialData?: FetcherResponse<Item>;
}

interface UseInfiniteScrollReturn<Item> {
  data: Item[];
  isError: boolean;
  isLoading: boolean;
  sentinelRef: RefObject<HTMLDivElement | null>;
}

export default function useInfiniteScroll<Item extends { uuid?: string }>({
  fetcher,
  initialData,
}: UseInfiniteScrollProps<Item>): UseInfiniteScrollReturn<Item> {
  const [dataList, setDataList] = useState<Item[]>(initialData?.items ?? []);
  const [pagination, setPagination] = useState<Pagination>(
    initialData?.pagination ?? {
      current: 0,
      total: 1,
    }
  );
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const isEnd = useMemo(() => pagination.current === pagination.total, [pagination]);

  const loadNextPage = useCallback(async () => {
    if (isEnd) return;
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setIsLoading(true);

    const pageNum = pagination.current + 1;
    const res = await fetcher(pageNum);
    if (!res) {
      setIsError(true);
      setIsLoading(false);
      return;
    }

    setDataList(prev => {
      const uuidSet = new Set(prev.map(item => item.uuid));
      const newItems = res.items.filter(item => !item.uuid || !uuidSet.has(item.uuid));
      return prev.concat(newItems);
    });

    setPagination(res.pagination);
    setIsLoading(false);
    setIsError(false);
  }, [pagination, isEnd, fetcher]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const io = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadNextPage();
        }
      },
      { rootMargin: "200px 0px" }
    );

    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [loadNextPage]);

  return {
    data: dataList,
    isError,
    isLoading,
    sentinelRef,
  };
}
