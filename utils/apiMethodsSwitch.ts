import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

export interface Controller {
  get?: (req: NextApiRequest, res: NextApiResponse) => Promise<any | void>;
  post?: (req: NextApiRequest, res: NextApiResponse) => Promise<any | void>;
  patch?: (req: NextApiRequest, res: NextApiResponse) => Promise<any | void>;
  remove?: (req: NextApiRequest, res: NextApiResponse) => Promise<any | void>;
}

export async function apiMethodsSwitch(req: NextApiRequest, res: NextApiResponse, controller: Controller) {
  const { method } = req;
  const { get, post, patch, remove } = controller;
  switch (method) {
    case 'GET':
      get ? await get(req, res) : res.status(StatusCodes.METHOD_NOT_ALLOWED).end(notAllowed(method));
      break;
    case 'POST':
      post ? await post(req, res) : res.status(StatusCodes.METHOD_NOT_ALLOWED).end(notAllowed(method));
      break;
    case 'PATCH':
      patch ? await patch(req, res) : res.status(StatusCodes.METHOD_NOT_ALLOWED).end(notAllowed(method));
      break;
    case 'DELETE':
      remove ? await remove(req, res) : res.status(StatusCodes.METHOD_NOT_ALLOWED).end(notAllowed(method));
      break;
    default:
      res.status(405).end(notAllowed(method));
  }
}

const notAllowed = (method: string | undefined): string => {
  return `Method ${method} Not Allowed`;
};
