'use client';

import { useCallback, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';

export default function Switcher({ left, right, mid, switchEvent }: SwitcherProps) {
  const midClasses = 'h-full w-10 bg-white cursor-pointer hover:bg-gray-100  text-gray-200';

  const similarLabelCss =
    'bg-white inline-flex items-center justify-center peer-checked:bg-gray-100 peer-checked: h-full w-full cursor-pointer hover:bg-gray-100';

  const [selected, setSelected] = useState(mid);

  const switchCallback = useCallback(
    (value: string) => {
      switchEvent(value);
    },
    [switchEvent],
  );

  const debouncedSendRequest = useMemo(() => {
    return debounce(switchCallback, 500);
  }, [switchCallback]);

  function change(e: any) {
    const switchValue = e.target.value;
    setSelected(switchValue);
    debouncedSendRequest(switchValue);
  }

  return (
    <div className='w-full h-8 flex flex-row border-collapse mt-4 drop-shadow-lg divide-x divide-gray-200'>
      <div className='inline-block basis-1/2'>
        <input
          onChange={change}
          className='hidden peer'
          type='radio'
          id='left'
          value={left}
          checked={selected === left}
        />
        <label
          htmlFor='left'
          className={`${similarLabelCss} rounded-l-md`}
        >
          {left}
        </label>
      </div>

      <div className={midClasses}>
        <input
          onChange={change}
          className='hidden peer'
          type='radio'
          id='mid'
          value={mid}
          checked={selected === mid}
        />
        <label
          htmlFor='mid'
          className={`${similarLabelCss} p-1`}
        >
          <img
            src='/icons/all_inclusive_FILL0_wght400_GRAD0_opsz48.svg'
            alt='icon'
          ></img>
        </label>
      </div>

      <div className='inline-block basis-1/2'>
        <input
          onChange={change}
          className='hidden peer'
          type='radio'
          id='right'
          value={right}
          checked={selected === right}
        />
        <label
          htmlFor='right'
          className={`${similarLabelCss} rounded-r-md`}
        >
          {right}
        </label>
      </div>
    </div>
  );
}

type SwitcherProps = {
  left: string;
  right: string;
  mid: string;
  switchEvent: (value: string) => void;
};
