import { NextApiRequest, NextApiResponse } from 'next';
import { apiMethodsSwitch } from '@/utils/apiMethodsSwitch';
import TagController from '@/pages/api/tag/controller';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await apiMethodsSwitch(req, res, TagController);
}
