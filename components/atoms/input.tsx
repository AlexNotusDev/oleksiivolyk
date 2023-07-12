'use client';

import { twMerge } from 'tailwind-merge';

export default function Input({ placeholder, value, changeEvent, id, disabled, styles = '' }: InputProps) {
  const updStyles = twMerge('bg-white border-1 border-gray-500 rounded-md px-2 w-full', styles);

  return (
    <input
      type='text'
      id={id}
      value={value}
      placeholder={placeholder}
      className={updStyles}
      onChange={changeEvent}
      disabled={disabled}
    />
  );
}

type InputProps = {
  placeholder: string;
  value: string;
  changeEvent: (e: any) => void;
  id: string;
  disabled?: boolean;
  styles?: string;
};
