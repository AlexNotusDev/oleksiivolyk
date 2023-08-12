import { Tag } from '@/models/tag';

export default function Tag({ tag, clickEvent }: TagProps) {
  function handleClick() {
    clickEvent && clickEvent(tag.id);
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

type TagProps = { tag: Tag; clickEvent?: (id: string) => void };
