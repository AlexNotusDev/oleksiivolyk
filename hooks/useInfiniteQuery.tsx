import useSWRInfinite from 'swr/infinite';
import { fetcher } from '@/utils/fetcher';
import isEmpty from 'lodash/isEmpty';

export default function UseInfiniteQuery(queryKey: string, limit: number) {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;

    const search = queryKey.includes('?');
    return `${queryKey}${search ? '&' : '?'}page=${pageIndex}&limit=${limit}`;
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  const fetchNextPage = () => {
    setSize((size) => size + 1);
  };

  const flattenPages = data?.flatMap((page) => page) ?? [];
  const isFetchingInitialData = !data && !error;
  const isHasNextPage = data && !isEmpty(data[size - 1]) && [...data[size - 1]].length == limit;
  const isFetchingNextPage = size > 0 && data && typeof data[size - 1] === 'undefined';

  return {
    data: flattenPages,
    error,
    fetchNextPage,
    isFetchingInitialData,
    isFetchingNextPage,
    isHasNextPage,
  };
}
