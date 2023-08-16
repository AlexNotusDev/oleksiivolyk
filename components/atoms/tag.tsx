import { Tag } from '@/models/tag';
import React from 'react';

export default function Tag({ tag, clickEvent }: TagProps) {
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    clickEvent && clickEvent(tag);
  }

  return (
    <div
      className='rounded-md bg-white border-1 border-gray-300 text-sm mx-0.5 px-2 z-20 hover:bg-gray-200'
      onClick={handleClick}
    >
      {tag.title}
    </div>
  );
}

type TagProps = { tag: Tag; clickEvent?: (tag: Tag) => void };
