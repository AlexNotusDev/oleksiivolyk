'use client';

import { HeaderButtons } from '@/components/organisms/header';

export default function NavigationMobile({
  buttons,
  clickEvent,
}: {
  buttons: HeaderButtons[];
  clickEvent: (r: string) => void;
}) {
  return (
    <div className='w-full h-screen fixed bg-white top-20 z-1 '>
      {buttons.map(({ name, route }) => (
        <button
          key={name}
          className='h-10 w-full flex items-center p-2 border-b-1 border-gray-200 active:bg-gray-200'
          onClick={() => clickEvent(route)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
