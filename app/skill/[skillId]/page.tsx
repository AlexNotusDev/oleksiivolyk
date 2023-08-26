'use client';

import { useContext, useEffect, useMemo, useState } from 'react';
import skillClient from '@/сlients/skillClient';
import ButtonOutlined from '@/components/atoms/buttonOutlined';
import { User } from '@prisma/client';
import { UserContext } from '@/utils/userProvideComponent';
import { UserRole } from '@/utils/constants';
import AddQuestionForm from '@/components/organisms/addQuestionForm';
import questionClient from '@/сlients/questionClient';
import { Skill } from '@/models/skill';
import Question from '@/components/molecules/question';
import { useRouter } from 'next/navigation';
import questionProgressLSService from '@/app/skill/[skillId]/questionsProgressLSService';

export default function Skill({ params }: { params: { skillId: string } }) {
  const { skillId } = params;
  const [skill, setSkill] = useState<Skill | null>(null);
  const [hidedQuestionIds, setHidedQuestionIds] = useState<Set<string>>(new Set());
  const [isShowQuestionForm, setIsShowQuestionForm] = useState<boolean>(false);
  const user = useContext<User | null>(UserContext);
  const router = useRouter();

  useEffect(() => {
    const savedQuestionsProgress = questionProgressLSService.retrieveSkillQuestionsProgress(skillId);

    if (savedQuestionsProgress && savedQuestionsProgress.length) {
      setHidedQuestionIds(new Set(savedQuestionsProgress));
    }

    const getSkill = async () => {
      return setSkill(await skillClient.getSkillById(skillId));
    };

    getSkill();
  }, [skillId]);

  function showQuestionFormHandler() {
    setIsShowQuestionForm(true);
  }

  async function saveQuestion(questionFormData: NewQuestionFormData) {
    const question = await questionClient.addQuestion({
      ...questionFormData,
      skillId: skill?.id,
    } as QuestionWithSkillId);

    setSkill((prev) => {
      if (prev) {
        prev?.questions?.push(question);
        return { ...prev };
      }

      return null;
    });

    hideForm();
  }

  function hideForm() {
    setIsShowQuestionForm(false);
  }

  function hideQuestionHandler(id: string) {
    setHidedQuestionIds((prev: Set<string>) => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });

    questionProgressLSService.updateQuestionsProgress(skillId, id);
  }

  const skillWithFilteredQuestions = useMemo(() => {
    return skill ? { ...skill, questions: skill?.questions?.filter(({ id }) => !hidedQuestionIds.has(id)) } : null;
  }, [hidedQuestionIds, skill]);

  async function rescheduleReviseHandler() {
    const currDate = new Date();
    currDate.setMonth(currDate.getMonth() + (skill?.frequencyInMonths || 0));

    await skillClient.updateReviseDate({ nextRevise: currDate, id: skillId } as Partial<Skill>);
    questionProgressLSService.removeQuestionsProgress(skillId);
    router.push('/skill');
  }

  function dropProgressHandler() {
    setHidedQuestionIds(new Set());

    questionProgressLSService.removeQuestionsProgress(skillId);
  }

  return (
    <div className='px-2 sm:px-0'>
      <div className='drop-shadow-lg rounded-md bg-white h-16 w-full flex flex-row justify-between items-center px-4'>
        <div className='flex flex-row'>
          <p className='text-lg border-r-1 pr-4 pt-1'>{skill?.title}</p>
          <div className='ml-4'>
            <p className='text-sm text-gray-500'> Questions: {skill?.questions?.length}</p>
            <p className='text-sm text-gray-500'> Revised: {hidedQuestionIds.size}</p>
          </div>
        </div>
        <div className='flex flex-row space-x-2'>
          {user?.role === UserRole.ADMIN && (
            <ButtonOutlined
              text='Add'
              clickEvent={showQuestionFormHandler}
              styles='w-fit px-2'
            />
          )}
          {hidedQuestionIds.size > 0 && (
            <ButtonOutlined
              text='Drop progress'
              clickEvent={dropProgressHandler}
              styles='w-fit px-2'
            />
          )}
          {user?.role === UserRole.ADMIN && skill?.questions?.length === hidedQuestionIds.size && (
            <ButtonOutlined
              text='Reschedule revise'
              clickEvent={rescheduleReviseHandler}
              styles='w-fit px-2'
            />
          )}
        </div>
      </div>
      {isShowQuestionForm && (
        <AddQuestionForm
          submitEvent={saveQuestion}
          declineEvent={hideForm}
        />
      )}
      <div className='space-y-4 mt-4 overflow-scroll pb-4'>
        {skillWithFilteredQuestions?.questions?.map((question) => (
          <Question
            key={question.id}
            question={question}
            hideEvent={hideQuestionHandler}
          />
        ))}
      </div>
    </div>
  );
}
