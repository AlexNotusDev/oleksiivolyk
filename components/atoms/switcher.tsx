'use client';

import { useCallback, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';

export default function Switcher({ left, right, mid, switchEvent }: SwitcherProps) {
  const midClasses = 'h-full w-10 bg-white cursor-pointer hover:bg-gray-100 text-gray-200';

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

  const icon = <span className='text-2xl font-extralight text-black mb-[2px]'>∞</span>;

  const buttons: SwitcherButton[] = [
    { value: left, labelStyles: `${similarLabelCss} rounded-l-md` },
    { value: mid, isMid: true, labelStyles: `${similarLabelCss} p-1` },
    { value: right, labelStyles: `${similarLabelCss} rounded-r-md` },
  ];

  return (
    <div className='w-full h-8 flex flex-row border-collapse drop-shadow-lg divide-x divide-gray-200'>
      {buttons.map(({ value, labelStyles, isMid }) => (
        <div
          className={isMid ? midClasses : 'inline-block basis-1/2'}
          key={value}
        >
          <input
            onChange={change}
            className='hidden peer'
            type='radio'
            id={value}
            value={value}
            checked={selected == value}
          />
          <label
            htmlFor={value}
            className={labelStyles}
          >
            {isMid ? icon : value}
          </label>
        </div>
      ))}
    </div>
  );
}

type SwitcherProps = {
  left: string;
  right: string;
  mid: string;
  switchEvent: (value: string) => void;
};

type SwitcherButton = {
  value: string;
  labelStyles: string;
  isMid?: boolean;
};
