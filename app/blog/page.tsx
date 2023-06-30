import InputSearch from '@/components/atoms/InputSearch';
import Switcher from '@/components/atoms/switcher';
import { getCurrentUser } from '@/сlients/userClient';
import { User } from '@prisma/client';
import { ButtonForRedirect } from '@/components/atoms/buttonForRedirect';
import { UserRole } from '@/utils/constants';
import InfiniteDataList from '@/components/templates/infiniteDataList';
import BlogListItem from '@/components/molekules/blogListItem';

async function categorySwitcher(value: string | undefined) {
  'use server';
  console.log(value);
}

async function searchInputHandler(value) {
  'use server';
  console.log(value);
}

export default async function Blog() {
  const user: null | User = await getCurrentUser();

  return (
    <div className='flex flex-row h-full '>
      <div className='w-[17.5%]'>
        <InputSearch inputEvent={searchInputHandler} />
        <Switcher
          left='tech'
          right='life'
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
          queryKey={`${process.env.apiUrl}/blog`}
        />
      </div>
    </div>
  );
}
