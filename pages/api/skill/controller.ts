import { Controller } from '@/utils/apiMethodsSwitch';
import { NextApiRequest, NextApiResponse } from 'next';

class SkillController extends Controller {
  post(req: NextApiRequest, res: NextApiResponse) {}
}

const skillController = new SkillController();
export default skillController;
