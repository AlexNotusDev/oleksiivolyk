import type { NextApiRequest, NextApiResponse } from 'next';
import { Blog } from '@/models/Blog';
import { apiMethodsSwitch } from '@/utils/apiMethodsSwitch';
import BlogController from '@/pages/api/blog/controller';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Blog[]>) {
  await apiMethodsSwitch(req, res, BlogController);
}
