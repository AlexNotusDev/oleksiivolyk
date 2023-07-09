'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/сlients/prismadbClient';
import { User } from '.prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserRole } from '@/utils/constants';
import { StatusCodes } from 'http-status-codes';

export async function getSession(req, res) {
  if (req && res) {
    return getServerSession(req, res, authOptions as any);
  }
  return getServerSession(authOptions as any);
}

export async function getCurrentUser(req?: NextApiRequest, res?: NextApiResponse): Promise<User | null> {
  try {
    const session = await getSession(req, res);
    const email = session?.user?.email;

    if (!email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({ where: { email } });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (e) {
    return null;
  }
}

export async function authGuard(req: NextApiRequest, res: NextApiResponse, isAdminOnly = false) {
  const accessForbiddenMessage = 'You do not have access to this resource';

  if (isAdminOnly) {
    const user = await getCurrentUser(req, res);

    if (!user || user.role !== UserRole.ADMIN) {
      res.status(StatusCodes.FORBIDDEN).send({
        error: accessForbiddenMessage,
      });
    }
  } else {
    const session = await getServerSession(req as any, res as any, authOptions as any);
    if (!session) {
      res.status(StatusCodes.FORBIDDEN).end({
        error: accessForbiddenMessage,
      });
    }
  }
}
