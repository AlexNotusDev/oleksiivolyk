import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { LayoutStyle } from '@/utils/constants';

export default function ButtonWithIcon({
  iconUrl,
  clickEvent,
  style = LayoutStyle.UNIT,
  styles,
  imgStyles,
}: ButtonWithIconProps) {
  const styleMap: { [key: string]: string } = {
    [LayoutStyle.UNIT]: 'h-8 w-8 drop-shadow-lg rounded-md p-2 bg-white cursor:pointer relative',
    [LayoutStyle.PARTICLE]: 'h-8 w-8 border-1 border-gray-500 rounded-md cursor:pointer relative hover:scale-105',
  };

  return (
    <button
      onClick={clickEvent}
      className={twMerge(styleMap[style], styles)}
    >
      <Image
        alt='button image'
        src={iconUrl}
        className={twMerge('rounded-md', imgStyles)}
        fill
      />
    </button>
  );
}

type ButtonWithIconProps = {
  iconUrl: string;
  styles?: string;
  imgStyles?: string;
  style?: LayoutStyle;
  clickEvent: () => void;
};
