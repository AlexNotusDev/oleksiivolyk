'use client';

import useInfiniteQuery from '@/hooks/useInfiniteQuery';
import { LegacyRef, useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';
import useIsInViewport from '@/hooks/useIsInViewport';

export default function InfiniteDataList({ queryKey, ItemComponent }) {
  const { data, error, fetchNextPage, isFetchingInitialData, isHasNextPage } = useInfiniteQuery(queryKey, 4);

  const scrollList = useRef<HTMLDivElement>();

  const [isInViewPort, visibleElement] = useIsInViewport<HTMLDivElement>(100);

  const debouncedLoadMore = debounce(function loadMore() {
    if (isInViewPort) {
      fetchNextPage();
    }
  }, 500);

  useEffect(() => {
    if (scrollList && scrollList.current && isHasNextPage) {
      scrollList.current.addEventListener('scroll', debouncedLoadMore);
    }

    return () => {
      if (scrollList && scrollList.current) {
        scrollList.current.removeEventListener('scroll', debouncedLoadMore);
      }
    };
  });

  if (error) return <div> Error</div>;

  if (isFetchingInitialData && data?.length === 0) return <div>Loading...</div>;

  return (
    <div
      className='h-full w-full overflow-scroll'
      ref={scrollList as LegacyRef<any>}
    >
      {data?.map((item) => (
        <ItemComponent
          key={item.id}
          {...item}
        />
      ))}
      {isHasNextPage ? (
        <div ref={visibleElement as LegacyRef<any>}></div>
      ) : (
        <div className='text-center'>{"That's all\n"}</div>
      )}
    </div>
  );
}
