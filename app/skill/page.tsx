'use client';

import { useCallback, useContext, useEffect, useState } from 'react';
import { User } from '@prisma/client';
import { UserContext } from '@/utils/userProvideComponent';
import { UserRole } from '@/utils/constants';
import AddSkillForm from '@/components/organisms/addSkillForm';
import SkillsListItem from '@/components/molecules/skillsListItem';
import { NewSkillData, NewSkillFormData, Skill, SkillStatus, SkillWithStatus } from '@/models/skill';
import skillClient from '@/сlients/skillClient';
import questionProgressLSService from '@/app/skill/[skillId]/questionsProgressLSService';

const DAYS_FOR_CHANGE_STATUS = 10;
const MS_IN_DAY_NUMBER = 1000 * 60 * 60 * 24;

export default function Skills() {
  const user = useContext<User | null>(UserContext);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const getSkills = async () => {
      setSkills(await skillClient.getSkills());
    };

    getSkills();
  }, []);

  async function handleSaveEvent(skillData: NewSkillFormData) {
    const nextReviseDate = new Date();
    nextReviseDate.setMonth(new Date().getMonth() + skillData.frequencyInMonths);

    const newSkill = await skillClient.createBlog({ ...skillData, nextRevise: nextReviseDate } as NewSkillData);
    setSkills((prevState) => prevState.concat(newSkill));
  }

  const generateSkillStatus = useCallback((skill: Skill): SkillWithStatus => {
    const currentDate = new Date();
    const skillUpd: SkillWithStatus = { ...skill };
    const daysDifference = Math.floor(
      (new Date(skill.nextRevise).getTime() - currentDate.getTime()) / MS_IN_DAY_NUMBER,
    );

    if (questionProgressLSService.retrieveSkillQuestionsProgress(skill.id)) {
      skillUpd.statusMessage = 'in progress';
      skillUpd.status = SkillStatus.IN_PROGRESS;
      return skillUpd;
    }

    if (daysDifference > 0) {
      skillUpd.statusMessage = `in ${daysDifference} days`;
      skillUpd.status = daysDifference > DAYS_FOR_CHANGE_STATUS ? SkillStatus.REVISE_IN : SkillStatus.REVISE_SOON;
    } else if (daysDifference == 0) {
      skillUpd.statusMessage = `today`;
      skillUpd.status = SkillStatus.REVISE_SOON;
    } else {
      skillUpd.statusMessage = `${Math.abs(daysDifference)} days overdue`;
      skillUpd.status = SkillStatus.NEED_REVISE;
    }

    return skillUpd;
  }, []);

  return (
    <div>
      {user?.role === UserRole.ADMIN && <AddSkillForm saveEvent={handleSaveEvent} />}
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 pb-4 overflow-scroll'>
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
