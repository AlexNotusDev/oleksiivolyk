import { LayoutStyle } from '@/utils/constants';
import { twMerge } from 'tailwind-merge';
import { SelectOption } from '@/components/atoms/multiSelectWithSearch';

export default function OptionsList({ options, clickEvent, style }: OptionsListProps) {
  const styleMap: { [key: string]: string } = {
    [LayoutStyle.UNIT]: 'bg-white rounded-md drop-shadow-lg',
    [LayoutStyle.PARTICLE]: 'border-1 border-gray-500 rounded-md ',
  };

  return (
    <div
      className={twMerge('cursor-pointer w-full h-8 pt-1 whitespace-nowrap overflow-scroll px-2', styleMap[style])}
      onClick={clickEvent}
    >
      {options.map(({ title }) => title).join(', ')}
    </div>
  );
}

type OptionsListProps = {
  options: SelectOption[];
  clickEvent: () => void;
  style: string;
};
