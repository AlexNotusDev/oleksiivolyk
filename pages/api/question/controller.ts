import { Controller } from '@/utils/apiMethodsSwitch';
import { authGuard } from '@/сlients/userClient';
import { NextApiRequest, NextApiResponse } from 'next';
import { ValidationError } from 'yup';
import { StatusCodes } from 'http-status-codes';
import { addQuestionSchema } from '@/pages/api/question/validators';
import questionApiService from '@/pages/api/question/service';

class QuestionController implements Controller {
  async post(req: NextApiRequest, res: NextApiResponse) {
    await authGuard(req, res, true);

    let { body } = req;

    try {
      body = addQuestionSchema.validateSync(body, { abortEarly: false, stripUnknown: true });
    } catch (e) {
      const error = e as ValidationError;

      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: error.errors });
    }

    try {
      const newQuestion = await questionApiService.addQuestion(body);
      res.status(StatusCodes.CREATED).send(newQuestion);
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end(e);
    }
  }
}

const questionController = new QuestionController();
export default questionController;
