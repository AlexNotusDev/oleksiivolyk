'use client';

import Date from '@/components/atoms/date';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TagsList from '@/components/molecules/tagsList';
import { Blog } from '@/models/blog';

export default function BlogListItem({ id, img, title, description, createdAt, tags }: Blog) {
  const router = useRouter();

  function handleClick() {
    router.push(`/blog/${id}`);
  }

  return (
    <div
      className='bg-white rounded-md mb-4 drop-shadow-lg p-4 cursor-pointer'
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
          <div className='flex flex-row justify-between'>
            <TagsList tags={tags} />
            <div className='ml-2'>{<Date date={createdAt} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
