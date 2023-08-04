'use client';

import Date from '@/components/atoms/date';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Blog } from '@prisma/client';

export default function BlogListItem({ id, img, title, description, createdAt }: Blog) {
  const router = useRouter();

  function handleClick() {
    router.push(`/blog/${id}`);
  }

  return (
    <div
      className='bg-white rounded-md mb-4 drop-shadow-lg p-4 cursor-pointer'
      onClick={handleClick}
    >
      <div className='flex flex-col w-full h-full sm:flex-row'>
        <div className='flex-shrink-0 sm:w-60 sm:mr-4 h-60 sm:h-52 w-full relative border-1 border-gray-200 rounded-md'>
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
          <div className='flex flex-row justify-end'>
            <div className='ml-2'>{<Date date={createdAt} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
