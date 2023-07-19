import Image from 'next/image';

export default function ButtonOutlined({ text, clickEvent, isDisabled, imageUrl, styles }: ButtonOutlinedProps) {
  return (
    <button
      className={`h-8 w-24 rounded-lg border-1 border-gray-500 cursor-pointer flex flex-row justify-around items-center 
      active:scale-100 hover:scale-105 disabled:text-gray-300 disabled:border-gray-300 disabled:pointer-events-none ${styles}`}
      onClick={clickEvent}
      disabled={isDisabled}
    >
      {imageUrl && (
        <Image
          alt='img'
          src={imageUrl}
          height={20}
          width={20}
          className='rounded-md'
        />
      )}
      <span>{text}</span>
    </button>
  );
}

type ButtonOutlinedProps = {
  text: string;
  clickEvent: (e: any) => void;
  isDisabled?: boolean;
  imageUrl?: string;
  styles?: string;
};
