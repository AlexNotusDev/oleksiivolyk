import { twMerge } from 'tailwind-merge';

export default function Button({ clickEvent, text, styles }: ButtonProps) {
  const custom = twMerge(
    'border-gray-300 bg-white drop-shadow-md rounded-md flex justify-center items-center cursor-pointer active:scale-100 hover:scale-105',
    styles,
  );

  return (
    <button
      className={custom}
      onClick={clickEvent}
    >
      {text}
    </button>
  );
}

type ButtonProps = {
  clickEvent: () => void;
  text: string;
  styles: string;
};
