import useSWRInfinite from 'swr/infinite';
import { fetcher } from '@/utils/fetcher';
import isEmpty from 'lodash/isEmpty';

export default function UseInfiniteQuery(queryKey, limit) {
  const getKey = (pageIndex, previousPageData) => {
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
  const isFetchingNextPage = isFetchingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isHasNextPage = data && !isEmpty(data[size - 1]) && [...data[size - 1]].length == limit;

  return {
    data: flattenPages,
    error,
    fetchNextPage,
    isFetchingInitialData,
    isFetchingNextPage,
    isHasNextPage,
  };
}

//export default function UseInfiniteQuery(queryKey, initialData) {
//   const { data, error, size, setSize } = useSWRInfinite(
//     (pageIndex, previousPageData) => {
//       if (previousPageData && !previousPageData.after) return null;
//       if (pageIndex === 0) return queryKey;
//
//       const search = queryKey.includes('?');
//       return `${queryKey}${search ? '&' : '?'}cursor=${encodeURIComponent(
//         JSON.stringify(previousPageData.after),
//       )}`;
//     },
//     fetcher,
//     initialData,
//   );
//
//   const fetchNextPage = () => {
//     setSize((size) => size + 1);
//   };
//
//   const flattenPages = data?.flatMap((page) => page) ?? [];
//   const hasNextPage = Boolean(data?.[size - 1]?.after);
//   const isFetchingInitialData = !data && !error;
//   const isFetchingNextPage =
//     isFetchingInitialData ||
//     (size > 0 && data && typeof data[size - 1] === 'undefined');
//
//   return {
//     data: flattenPages,
//     error,
//     hasNextPage,
//     fetchNextPage,
//     isFetchingInitialData,
//     isFetchingNextPage,
//   };
// }
