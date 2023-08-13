'use client';

import Switcher from '@/components/atoms/switcher';
import { BlogCategory, LayoutStyle, UserRole } from '@/utils/constants';
import InfiniteDataList from '@/components/templates/infiniteDataList';
import BlogListItem from '@/components/molecules/blogListItem';
import { useCallback, useContext, useState } from 'react';
import { UserContext } from '@/utils/userProvideComponent';
import { User } from '@prisma/client';
import useMediaQuery from '@/hooks/useMediaQuery';
import ButtonWithIcon from '@/components/atoms/buttonWithIcon';
import Button from '@/components/atoms/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Input from '@/components/atoms/input';
import queryCompose from '@/utils/queryCompose';

const SEARCH_BLOGS_DEBOUNCE = 500;

export default function Blogs() {
  const [isFiltersActive, setIsFiltersActive] = useState<boolean>(false);
  const user = useContext<User | null>(UserContext);
  const isMobile = useMediaQuery('(max-width: 640px)');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(queryCompose, [searchParams]);

  function updateParams(key: string, value: string) {
    router.push(pathname + '?' + createQueryString(key, value, searchParams));
  }

  function categorySwitcher(value: string | null): void {
    updateParams('category', value !== BlogCategory.ALL ? value : '');
  }

  function searchInputHandler(value: string): void {
    updateParams('searchInput', value);
  }

  function handleFilterClick() {
    setIsFiltersActive((value) => !value);
  }

  function handleAddPostClick() {
    router.push('/new-blog-interface');
  }

  const switcherComp = (
    <Switcher
      left={BlogCategory.TECH}
      right={BlogCategory.LIFE}
      mid={BlogCategory.ALL}
      switchEvent={categorySwitcher}
    />
  );

  const mobileInterface = (
    <>
      <ButtonWithIcon
        iconUrl='/icons/filter.svg'
        clickEvent={handleFilterClick}
        styles={`shrink-0 ${isFiltersActive && 'filter-none'}`}
      />
      {user?.role === UserRole.ADMIN && (
        <ButtonWithIcon
          iconUrl='/icons/post_add.svg'
          clickEvent={handleAddPostClick}
          styles='shrink-0'
        />
      )}
    </>
  );

  const desktopInterface = (
    <>
      {switcherComp}
      {user?.role === UserRole.ADMIN && (
        <Button
          text='Add new blog'
          styles='w-full h-8'
          clickEvent={handleAddPostClick}
        />
      )}
    </>
  );

  const mobileOnDemandFilters = (
    <div className={`px-2 grid grid-cols-2 mb-4 gap-4 ${!isFiltersActive && 'hidden'}`}>{switcherComp}</div>
  );

  return (
    <div className='flex flex-col h-full sm:space-x-2 sm:flex-row'>
      <div className='sm:flex space-x-4 shrink-0 sm:space-x-0 flex flex-row sm:flex-col px-2 sm:space-y-4 align-top w-full sm:w-[18%] sm:min-w-[180px] sm:px-0 mb-4'>
        <Input
          changeEvent={searchInputHandler}
          placeholder='Search...'
          style={LayoutStyle.UNIT}
          debounceMS={SEARCH_BLOGS_DEBOUNCE}
        />
        {isMobile ? mobileInterface : desktopInterface}
      </div>
      {mobileOnDemandFilters}
      <div className='w-full sm:w-[82%] overflow-scroll'>
        <InfiniteDataList
          ItemComponent={BlogListItem}
          queryKey={`/api/blog?${searchParams.toString()}`}
          limit={LIST_ITEMS_LIMIT}
        />
      </div>
    </div>
  );
}

const LIST_ITEMS_LIMIT = 4;
