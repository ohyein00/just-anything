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
  initialData?: FetcherResponse<Item>;
}

interface UseInfiniteScrollReturn<Item> {
  data: Item[];
  isError: boolean;
  isLoading: boolean;
  sentinelRef: RefObject<HTMLDivElement | null>;
  loadMore: () => Promise<void>;
}

export default function useInfiniteScroll<Item extends { uuid?: string }>({
  fetcher,
  initialData,
}: UseInfiniteScrollProps<Item>): UseInfiniteScrollReturn<Item> {
  const [dataList, setDataList] = useState<Item[]>(initialData?.items ?? []);
  const [current, setCurrent] = useState<number>(initialData?.pagination.current ?? 0);
  const [total, setTotal] = useState<number>(initialData?.pagination.total ?? 1);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sentinelRef = useRef<HTMLDivElement>(null);

  const hasNextPage = useMemo(() => current < total, [current, total]);

  const loadMore = useCallback(async () => {
    if (!hasNextPage || isLoading) return;
    setIsLoading(true);

    const pageNum = current + 1;

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

    setCurrent(res.pagination.current);
    setTotal(res.pagination.total);
    setIsLoading(false);
    setIsError(false);
  }, [current, hasNextPage, isLoading, fetcher]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const io = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isError) {
          loadMore();
        }
      },
      { rootMargin: "200px 0px" }
    );

    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [loadMore, isError]);

  return {
    data: dataList,
    isError,
    isLoading,
    sentinelRef,
    loadMore,
  };
}
