'use client';

import Date from '@/components/atoms/date';
import { useRouter } from 'next/navigation';

export default function BlogListItem({ id, img, title, description, createdAt }) {
  const router = useRouter();

  function handleClick() {
    router.push(`/blog/${id}`);
  }

  return (
    <div
      className='w-full bg-white rounded-md mb-4 drop-shadow-lg p-4 sm:h-56 md:h-56 lg:h-56 xl:h-44 2xl:h-44 cursor-pointer'
      onClick={handleClick}
    >
      <div className='flex flex-row mb-4 sm:h-40 md:h-40 lg:h-40 xl:h-28 2xl:h-28'>
        <img
          alt='post-image'
          src={img}
          className='rounded-md border-1 h-28 w-28'
        />
        <div className='flex flex-col ml-4'>
          <span className='text-lg font-bold'>{title}</span>
          <span>{description}</span>
        </div>
      </div>
      <div className='flex flex-row justify-between'>
        <div className='ml-2'>{<Date date={createdAt} />}</div>
      </div>
    </div>
  );
}
