'use client';

import useInfiniteQuery from '@/hooks/useInfiniteQuery';
import { LegacyRef, useEffect } from 'react';
import useIsInViewport from '@/hooks/useIsInViewport';

export default function InfiniteDataList({ queryKey, ItemComponent, limit }: InfinityDataListProps) {
  const { data, error, fetchNextPage, isFetchingInitialData, isHasNextPage, isFetchingNextPage } = useInfiniteQuery(
    queryKey,
    limit,
  );

  const LOADING_TEXT = 'Loading...';
  const [isInViewPort, visibleElement] = useIsInViewport<HTMLDivElement>();

  useEffect(() => {
    if (isInViewPort && isHasNextPage) {
      fetchNextPage();
    }
  }, [isInViewPort]);

  if (error) return <div> Error</div>;

  if (isFetchingInitialData && data?.length === 0)
    return <div className='w-full flex justify-center'>{LOADING_TEXT}</div>;

  return (
    <div className='h-full w-full overflow-scroll px-2'>
      {data?.map((item) => (
        <ItemComponent
          key={item.id}
          {...item}
        />
      ))}
      <div
        ref={visibleElement as LegacyRef<any>}
        className='text-center'
      >
        {isHasNextPage && LOADING_TEXT}
      </div>
      {!isHasNextPage && !isFetchingNextPage && data.length >= limit && (
        <div className='text-center'>{"That's all"}</div>
      )}
    </div>
  );
}

type InfinityDataListProps = { queryKey: string; ItemComponent: any; limit: number };
