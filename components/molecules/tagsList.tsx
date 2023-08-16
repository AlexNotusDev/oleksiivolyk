import TagComponent from '@/components/atoms/tag';
import { Tag } from '@/models/tag';

export default function TagsList({ tags, itemClickEvent }: TagsListProps) {
  return (
    <div className='space-x-1 flex flex-row flex-wrap z-10'>
      {tags.map((tag: Tag) => (
        <TagComponent
          key={tag.id}
          tag={tag}
          clickEvent={itemClickEvent}
        />
      ))}
    </div>
  );
}

type TagsListProps = {
  tags: Tag[];
  itemClickEvent?: (tag: Tag) => void;
};
