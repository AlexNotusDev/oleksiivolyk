'use client';

import Date from '@/components/atoms/date';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Blog } from '@prisma/client';

export default function BlogListItem({ id, img, title, description, createdAt }: Blog) {
  const router = useRouter();

  function handleClick() {
    console.log('Redirect to:', id);
    router.push(`/blog/${id}`);
  }

  return (
    <div
      className='w-[calc(100%-1.8rem)] bg-white rounded-md mb-4 drop-shadow-lg p-4 ml-4 cursor-pointer'
      onClick={handleClick}
    >
      <div className='flex flex-row w-full'>
        <div className='flex-shrink-0 w-60 h-60 relative'>
          <Image
            alt='post-image'
            src={img}
            fill
            className='rounded-md'
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className='flex flex-col justify-between w-[calc(100%-15rem)]'>
          <div className='flex flex-col ml-4 w-[calc(100%-1rem)]'>
            <span className='text-lg w-full font-bold truncate flex-grow'>{title}</span>
            <span className='textBoxWithEllipsis'>{description}</span>
          </div>
          <div className='flex flex-row justify-end'>
            <div className='ml-2'>{<Date date={createdAt} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
