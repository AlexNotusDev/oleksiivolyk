'use client';

import debounce from 'lodash/debounce';

export default function InputSearch({ inputEvent, debounceMS = 1000 }: InputSearchProps) {
  const debouncedInput = debounce(inputEvent, debounceMS);
  function handleInput(e: any) {
    debouncedInput(e.target.value);
  }

  return (
    <input
      type='text'
      name='search'
      id='search'
      placeholder='Search'
      onChange={handleInput}
      className='
        outline-none
        block
        w-full
        h-8
        rounded-md
        px-2
        text-gray-900
        drop-shadow-lg
        placeholder:text-gray-400
        sm:text-sm
        sm:leading-6
        '
    />
  );
}

type InputSearchProps = {
  inputEvent: (value: string) => void;
  debounceMS?: number;
};
