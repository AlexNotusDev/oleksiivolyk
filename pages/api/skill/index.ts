import { NextApiRequest, NextApiResponse } from 'next';
import { apiMethodsSwitch } from '@/utils/apiMethodsSwitch';
import SkillController from '@/pages/api/skill/controller';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await apiMethodsSwitch(req, res, SkillController);
}
