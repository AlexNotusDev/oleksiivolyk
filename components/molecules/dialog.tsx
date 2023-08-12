import ButtonOutlined from '@/components/atoms/buttonOutlined';
import { ReactElement, ReactNode } from 'react';

export default function Dialog({ content, buttonClickEvent, buttonTitle }: DialogProps) {
  return (
    <div className='border-1 border-gray-300 drop-shadow-md flex justify-between p-2 rounded-md bg-white'>
      {content as ReactNode}
      <ButtonOutlined
        styles='w-10 h-6 shrink-0'
        clickEvent={buttonClickEvent}
        text={buttonTitle}
      />
    </div>
  );
}

type DialogProps = {
  content: ReactElement | Element | ReactNode;
  buttonClickEvent: () => void;
  buttonTitle: string;
};
