import * as Yup from 'yup';
import { Shape } from '@/utils/schemaYupTs';
import { NewSkillData } from '@/models/skill';

export const createSkillBodySchema = Yup.object<Shape<NewSkillData>>({
  title: Yup.string().required(),
  img: Yup.string().required(),
  frequencyInMonths: Yup.number().min(1).max(6),
  nextRevise: Yup.date().required(),
});
