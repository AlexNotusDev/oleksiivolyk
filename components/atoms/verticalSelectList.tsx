import { SelectOption } from '@/components/atoms/multiSelectWithSearch';

export default function VerticalSelectList({ options, selectEvent }: VerticalSelectListProps) {
  return (
    <div className='divide-y-1 divide-gray-300 rounded-md flex flex-col overflow-scroll bg-white border-1 border-gray-300 drop-shadow-md'>
      {options.map((option) => {
        return (
          <p
            className='p-1 cursor-pointer hover:bg-gray-200'
            key={option.id}
            onClick={() => selectEvent(option)}
          >
            {option.title}
          </p>
        );
      })}
    </div>
  );
}

type VerticalSelectListProps = {
  options: SelectOption[];
  selectEvent: (selected: SelectOption) => void;
};
