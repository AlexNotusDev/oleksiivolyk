import { Controller } from '@/utils/apiMethodsSwitch';
import blogApiService from '@/pages/api/blog/service';
import { NextApiRequest, NextApiResponse } from 'next';
import { authGuard } from '@/сlients/userClient';
import { StatusCodes } from 'http-status-codes';

class BlogController implements Controller {
  async post(req: NextApiRequest, res: NextApiResponse) {
    await authGuard(req, res, true);

    const { body } = req;
    try {
      await blogApiService.createNewBlog(body);
      res.status(StatusCodes.CREATED).send('Success');
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end(e);
    }
  }

  async get(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req;

    try {
      if (!query.id) {
        const blogs = await blogApiService.getBlogs(query);
        res.status(StatusCodes.OK).send(blogs);
      } else {
        const blog = await blogApiService.getBlogById(query.id as string);
        res.status(StatusCodes.OK).send(blog);
      }
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end(e);
    }
  }
}

const blogController = new BlogController();
export default blogController;
