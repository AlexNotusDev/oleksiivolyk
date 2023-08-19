'use client';

import { SkillStatus, SkillWithStatus } from '@/models/skill';
import Image from 'next/image';

export default function SkillsListItem({ skill }: { skill: SkillWithStatus }) {
  const { img, title, frequencyInMonth, numberOfQuestions, status, statusMessage } = skill;

  const statusStyleMap = {
    [SkillStatus.REFRESH_IN]: 'text-green-600',
    [SkillStatus.REFRESH_SOON]: 'text-yellow-500',
    [SkillStatus.NEED_REFRESH]: 'text-red-600',
  };

  return (
    <div className='rounded-md drop-shadow-lg bg-white p-4 cursor-pointer flex flex-row'>
      <div className='w-20 h-20 rounded-full relative border-1'>
        <Image
          fill={true}
          src={img}
          alt='Skill img'
          className='rounded-full'
        />
      </div>
      <div className='flex flex-col ml-4'>
        <p className='text-lg'>{title}</p>
        <p className='text-sm text-gray-500'>{`Cycle: ${frequencyInMonth} months`}</p>
        <p className='text-sm text-gray-500'>{`Questions: ${numberOfQuestions}`}</p>
        <p className='text-sm text-gray-500 inline-block'>
          Status: <span className={`text-sm ${statusStyleMap[status]}`}>{statusMessage}</span>
        </p>
      </div>
    </div>
  );
}
