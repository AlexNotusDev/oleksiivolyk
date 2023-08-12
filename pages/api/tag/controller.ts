import { Controller } from '@/utils/apiMethodsSwitch';
import { NextApiRequest, NextApiResponse } from 'next';
import tagApiService from '@/pages/api/tag/service';
import { StatusCodes } from 'http-status-codes';
import { serializeError } from 'serialize-error';
import { getTagsSchema } from '@/pages/api/tag/validators';
import { ValidationError } from 'yup';

class TagController implements Controller {
  async get(req: NextApiRequest, res: NextApiResponse) {
    let { query } = req;

    try {
      query = getTagsSchema.validateSync(query, { abortEarly: false, stripUnknown: true });
    } catch (e) {
      const error = e as ValidationError;

      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: error.errors });
    }

    try {
      const tags = await tagApiService.getTags(query);
      res.status(StatusCodes.OK).send(tags);
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end(serializeError(e));
    }
  }
}

const tagController = new TagController();
export default tagController;
