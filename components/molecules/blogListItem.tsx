'use client';

import Date from '@/components/atoms/date';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import TagsList from '@/components/molecules/tagsList';
import { Blog } from '@/models/blog';
import { useCallback } from 'react';
import queryCompose from '@/utils/queryCompose';
import { Tag } from '@/models/tag';
import useMediaQuery from '@/hooks/useMediaQuery';

export default function BlogListItem({ id, img, title, description, createdAt, tags }: Blog) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery('(max-width: 640px)');

  const createQueryString = useCallback(queryCompose, [searchParams]);

  function handleClick() {
    router.push(`/blog/${id}`);
  }

  function handleItemClick({ title }: Pick<Tag, 'title'>) {
    router.push(pathname + '?' + createQueryString('tag', title, searchParams));
  }

  return (
    <div
      className='bg-white rounded-md mb-4 drop-shadow-lg hover:scale-[100.5%] p-4 cursor-pointer'
      onClick={handleClick}
    >
      <div className='flex flex-col w-full h-full md:flex-row'>
        <div className='flex-shrink-0 md:w-52 md:mr-4 h-60 md:h-52 w-full relative border-1 border-gray-200 rounded-md'>
          <Image
            alt='post-image'
            src={img}
            fill
            className='rounded-md'
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className='flex flex-col justify-between w-full'>
          <div className='flex flex-col '>
            <span className='text-lg w-full font-bold flex-grow'>{title}</span>
            <span className=''>{description}</span>
          </div>
          <div className={`flex flex-row justify-between items-end ${isMobile && 'mt-1'}`}>
            <TagsList
              tags={tags}
              itemClickEvent={handleItemClick}
            />
            <div className='flex-shrink-0'>
              {
                <Date
                  date={createdAt}
                  mask={isMobile ? 'shortDate' : undefined}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
