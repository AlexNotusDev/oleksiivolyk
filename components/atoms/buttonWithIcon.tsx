import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

export default function ButtonWithIcon({ iconUrl, styles, clickEvent, imgStyles }: ButtonWithIconProps) {
  return (
    <button
      onClick={clickEvent}
      className={twMerge('h-8 w-8 drop-shadow-lg rounded-md p-2 bg-white cursor:pointer relative  ', styles)}
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
  styles: string;
  imgStyles: string;
  clickEvent: () => void;
};
