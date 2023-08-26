'use client';

import { useState } from 'react';
import ButtonOutlined from '@/components/atoms/buttonOutlined';

export default function Question({ question, hideEvent }: QuestionProps) {
  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);

  function showAnswerClickHandler() {
    setShowAnswer(true);
  }

  function hideQuestionHandler() {
    hideEvent(question.id);
  }

  return (
    <div className='bg-white drop-shadow-lg rounded-md w-full h-fit p-4 flex flex-col items-center'>
      <p>{question.text}</p>
      <hr className='my-2 w-full' />
      {isShowAnswer ? (
        <p>
          {question.answer}
          <ButtonOutlined
            text='Hide'
            clickEvent={hideQuestionHandler}
            styles='w-fit px-2  inline-block border-0 underline underline-offset-4'
          />
        </p>
      ) : (
        <ButtonOutlined
          text='Show answer'
          clickEvent={showAnswerClickHandler}
          styles='w-fit px-2 border-0 underline underline-offset-4'
        />
      )}
    </div>
  );
}

type QuestionProps = {
  question: Question;
  hideEvent: (id: string) => void;
};
