import * as Yup from 'yup';
import { Shape } from '@/utils/schemaYupTs';

export const addQuestionSchema = Yup.object<Shape<QuestionWithSkillId>>({
  text: Yup.string().required(),
  answer: Yup.string().required(),
  skillId: Yup.string().required(),
});
