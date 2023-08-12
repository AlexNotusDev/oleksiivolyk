import { SelectOption } from '@/components/atoms/searchSelect';

export default function SelectedOptionsList({ selected, deleteClick }: SelectedOptionsListProps) {
  return (
    <div className='space-x-1'>
      {selected.map(({ id, title }) => (
        <div
          className='inline-block border-1 border-gray-300 px-1 rounded-md'
          key={id}
        >
          {title}
          <button
            onClick={() => deleteClick(id, title)}
            className='pl-2'
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}

type SelectedOptionsListProps = {
  selected: SelectOption[];
  deleteClick: (id: string, title: string) => void;
};
