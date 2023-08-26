import { NextApiRequest, NextApiResponse } from 'next';
import { apiMethodsSwitch } from '@/utils/apiMethodsSwitch';
import QuestionController from '@/pages/api/question/controller';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await apiMethodsSwitch(req, res, QuestionController);
}
