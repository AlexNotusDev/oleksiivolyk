'use client';

import { useCallback, useContext, useState } from 'react';
import { User } from '@prisma/client';
import { UserContext } from '@/utils/userProvideComponent';
import { UserRole } from '@/utils/constants';
import AddSkillInterface from '@/components/organisms/addSkillInterface';
import SkillsListItem from '@/components/molecules/skillsListItem';
import { NewSkill, Skill, SkillStatus, SkillWithStatus } from '@/models/skill';
import headerPhoto from '@/public/HeaderPhoto.png';

export default function Skills() {
  const user = useContext<User | null>(UserContext);

  const [skills, setSkills] = useState<Skill[]>([
    {
      id: 1,
      title: 'JavaScript',
      img: headerPhoto,
      frequencyInMonth: 2,
      numberOfQuestions: 5,
      lastRefresh: new Date('2023-06-19'),
    },
    {
      id: 2,
      title: 'JavaScript',
      img: headerPhoto,
      frequencyInMonth: 2,
      numberOfQuestions: 5,
      lastRefresh: new Date('2023-06-17'),
    },
    {
      id: 3,
      title: 'JavaScript',
      img: headerPhoto,
      frequencyInMonth: 2,
      numberOfQuestions: 5,
      lastRefresh: new Date('2023-06-21'),
    },
    {
      id: 4,
      title: 'JavaScript',
      img: headerPhoto,
      frequencyInMonth: 2,
      numberOfQuestions: 5,
      lastRefresh: new Date('2023-07-25'),
    },
  ]);

  function handleSaveEvent(skill: NewSkill) {
    setSkills((prev) => [...prev, skill]);
  }

  const generateSkillStatus = useCallback((skill: Skill): SkillWithStatus => {
    const currentDate = new Date();
    const refreshDate = new Date();

    const skillWithStatus: SkillWithStatus = { ...skill };

    refreshDate.setMonth(skill.lastRefresh.getMonth() + skill.frequencyInMonth);
    refreshDate.setDate(skill.lastRefresh.getDate());

    const daysDifference = Math.floor((refreshDate - currentDate) / (1000 * 60 * 60 * 24));

    if (daysDifference > 0) {
      skillWithStatus.statusMessage = `Refresh in ${daysDifference} days`;
      skillWithStatus.status = daysDifference > 10 ? SkillStatus.REFRESH_IN : SkillStatus.REFRESH_SOON;
    } else if (daysDifference == 0) {
      skillWithStatus.statusMessage = `Refresh today`;
      skillWithStatus.status = SkillStatus.REFRESH_SOON;
    } else {
      skillWithStatus.statusMessage = `Exceeded ${Math.abs(daysDifference)} days ago`;
      skillWithStatus.status = SkillStatus.NEED_REFRESH;
    }

    return skillWithStatus;
  }, []);

  return (
    <div>
      {user?.role === UserRole.ADMIN && <AddSkillInterface saveEvent={handleSaveEvent} />}
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 px-2 sm:px-0'>
        {skills.map((skill: Skill) => (
          <SkillsListItem
            key={skill.id}
            skill={generateSkillStatus(skill)}
          />
        ))}
      </div>
    </div>
  );
}
