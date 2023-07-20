'use client';

import InputSearch from '@/components/atoms/InputSearch';
import Switcher from '@/components/atoms/switcher';
import { ButtonForRedirect } from '@/components/atoms/buttonForRedirect';
import { BlogCategory, UserRole } from '@/utils/constants';
import InfiniteDataList from '@/components/templates/infiniteDataList';
import BlogListItem from '@/components/molecules/blogListItem';
import { useContext, useState } from 'react';
import { UserContext } from '@/utils/userProvideComponent';
import queryCompose from '@/utils/queryCompose';
import { User } from '@prisma/client';
import * as process from 'process';

export default function Blogs() {
  const [blogQuery, setBlogQuery] = useState({});
  const user = useContext<User | null>(UserContext);

  function categorySwitcher(value: string | null): void {
    setBlogQuery({ ...blogQuery, category: value });
  }

  function searchInputHandler(value: string): void {
    setBlogQuery({ ...blogQuery, searchInput: value });
  }

  console.log('ENV VARS CHECK:', process.env.dbUrl, '|', process.env.NEXT_PUBLIC_DATABASE_URL);

  return (
    <div className='flex flex-row h-full '>
      <div className='w-[17.5%]'>
        <InputSearch inputEvent={searchInputHandler} />
        <Switcher
          left={BlogCategory.TECH}
          right={BlogCategory.LIFE}
          mid={BlogCategory.ALL}
          switchEvent={categorySwitcher}
        />
        {user?.role === UserRole.ADMIN && (
          <ButtonForRedirect
            redirectUrl='/new-blog-interface'
            text='Add new blog'
            styles='w-full h-8 mt-4'
          />
        )}
      </div>
      <div className='w-[82.5%] flex flex-col items-center'>
        <InfiniteDataList
          ItemComponent={BlogListItem}
          queryKey={`${process.env.apiUrl}/blog?${queryCompose(blogQuery)}`}
          limit={LIST_ITEMS_LIMIT}
        />
      </div>
    </div>
  );
}

const LIST_ITEMS_LIMIT = 4;
