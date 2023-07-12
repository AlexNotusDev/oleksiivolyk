'use client';

import { twMerge } from 'tailwind-merge';

export default function TextArea({ placeholder, changeEvent, value, id, disabled, styles }: TextAreaProps) {
  const updStyles = twMerge('bg-white border-1 border-gray-500 rounded-md w-full px-2 w-full h-32', styles);

  return (
    <textarea
      className={updStyles}
      id={id}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={changeEvent}
    />
  );
}

type TextAreaProps = {
  placeholder: string;
  changeEvent: (e: any) => void;
  value: string;
  id: string;
  disabled?: boolean;
  styles?: string;
};
