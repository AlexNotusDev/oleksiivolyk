import type { NextApiRequest, NextApiResponse } from 'next';
import { apiMethodsSwitch } from '@/src/utils/apiMethodsSwitch';
import BlogController from '@/src/pages/api/blog/controller';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await apiMethodsSwitch(req, res, BlogController);
}
