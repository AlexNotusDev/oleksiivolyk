'use client';

import { SkillStatus, SkillWithStatus } from '@/models/skill';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SkillsListItem({ skill }: { skill: SkillWithStatus }) {
  const { img, title, frequencyInMonths, questionsCount, status, statusMessage, id } = skill;
  const router = useRouter();

  function handleClick() {
    router.push(`/skills/${id}`);
  }

  const statusStyleMap = {
    [SkillStatus.REVISE_IN]: 'text-green-600',
    [SkillStatus.REVISE_SOON]: 'text-yellow-500',
    [SkillStatus.NEED_REVISE]: 'text-red-600',
    [SkillStatus.IN_PROGRESS]: 'text-black',
  };

  return (
    <div
      className='rounded-md drop-shadow-lg bg-white p-4 cursor-pointer flex flex-row hover:scale-[101%] '
      onClick={handleClick}
    >
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
        <p className='text-sm text-gray-500'>{`Cycle: ${frequencyInMonths} months`}</p>
        <p className='text-sm text-gray-500'>{`Questions: ${questionsCount}`}</p>
        <p className='text-sm text-gray-500 inline-block'>
          Revise: <span className={`text-sm  ${status && statusStyleMap[status]}`}>{statusMessage}</span>
        </p>
      </div>
    </div>
  );
}
