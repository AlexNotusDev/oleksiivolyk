import VerticalSelectList from '@/components/atoms/verticalSelectList';
import Input from '@/components/atoms/input';
import { SelectOption } from '@/components/molecules/multiSelectWithSearch';
import { LayoutStyle } from '@/utils/constants';

export default function SelectWithSearch({
  options,
  value,
  placeholder,
  searchEvent,
  selectEvent,
  changeEvent,
  valuePrefix,
  style = LayoutStyle.UNIT,
  debounceMS = 500,
}: SelectWithSearchProps) {
  function handleSelect(option: SelectOption) {
    selectEvent(option);
    searchEvent('');
  }

  return (
    <div className='relative'>
      {value ? (
        <div className='block bg-white w-full h-8 rounded-md px-2 text-gray-900 drop-shadow-lg flex justify-between items-center'>
          <span>{`${valuePrefix} ${value}`}</span>
          <button
            className='hover:cursor-pointer text-lg mr-1'
            onClick={changeEvent}
          >
            x
          </button>
        </div>
      ) : (
        <Input
          changeEvent={searchEvent}
          style={style}
          placeholder={placeholder}
          debounceMS={debounceMS}
        />
      )}
      {!!options.length && (
        <div className='absolute w-full mt-2 left-0 z-20'>
          <VerticalSelectList
            options={options}
            selectEvent={handleSelect}
          />
        </div>
      )}
    </div>
  );
}

type SelectWithSearchProps = {
  options: SelectOption[];
  value: string;
  placeholder: string;
  searchEvent: (input: string) => void;
  selectEvent: (value: SelectOption) => void;
  changeEvent: () => void;
  valuePrefix: string;
  style?: LayoutStyle;
  debounceMS?: number;
};
