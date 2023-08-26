import { Controller } from '@/utils/apiMethodsSwitch';
import { NextApiRequest, NextApiResponse } from 'next';
import { authGuard } from '@/сlients/userClient';
import skillApiService from '@/pages/api/skill/service';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'yup';
import { createSkillBodySchema } from '@/pages/api/skill/validators';

class SkillController implements Controller {
  async post(req: NextApiRequest, res: NextApiResponse) {
    await authGuard(req, res, true);

    let { body } = req;

    try {
      body = createSkillBodySchema.validateSync(body, { abortEarly: false, stripUnknown: true });
    } catch (e) {
      const error = e as ValidationError;

      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: error.errors });
    }

    try {
      const skill = await skillApiService.createNewSkill(body);
      res.status(StatusCodes.CREATED).send({ ...skill, questionsCount: 0 });
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end(e);
    }
  }

  async get(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req;

    try {
      if (query.id) {
        const skill = await skillApiService.getSkillById(query.id as string);
        res.status(StatusCodes.OK).send(skill);
      } else {
        const skills = await skillApiService.getSkills();
        res.status(StatusCodes.OK).send(skills);
      }
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end(e);
    }
  }

  async patch(req: NextApiRequest, res: NextApiResponse) {
    const { body } = req;

    try {
      await skillApiService.updateSkill(body);
      res.status(StatusCodes.OK).send('Success');
    } catch (e) {
      res.status(StatusCodes.NOT_MODIFIED).end(e);
    }
  }
}

const skillController = new SkillController();
export default skillController;
