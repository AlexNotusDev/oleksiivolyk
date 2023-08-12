'use client';

import { twMerge } from 'tailwind-merge';
import debounce from 'lodash/debounce';
import { LayoutStyle } from '@/utils/constants';
import { LegacyRef } from 'react';

export default function Input({
  placeholder,
  value,
  changeEvent,
  id,
  disabled,
  reference = null,
  styles = '',
  style = LayoutStyle.UNIT,
  debounceMS = 0,
}: InputProps) {
  const debouncedInput = debounce(changeEvent, debounceMS);

  const styleMap = {
    [LayoutStyle.UNIT]:
      'outline-none block w-full h-8 rounded-md px-2 text-gray-900 drop-shadow-lg placeholder:text-gray-400 sm:text-sm sm:leading-6',
    [LayoutStyle.PARTICLE]: 'bg-white h-8 border-1 border-gray-500 rounded-md px-2 w-full',
  };

  const updStyles = twMerge(styleMap[style], styles);

  function handleInput(e: any) {
    debouncedInput(e.target.value);
  }

  return (
    <input
      type='text'
      id={id}
      value={value}
      placeholder={placeholder}
      className={updStyles}
      onChange={handleInput}
      disabled={disabled}
      ref={reference ? (reference as unknown as LegacyRef<HTMLInputElement>) : null}
    />
  );
}

type InputProps = {
  placeholder: string;
  changeEvent: (value: string) => void;
  reference?: HTMLInputElement | null;
  id?: string;
  value?: string;
  disabled?: boolean;
  styles?: string;
  style?: LayoutStyle;
  debounceMS?: number;
};
