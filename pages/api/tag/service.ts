import prismaClient from '@/сlients/prismadbClient';
import { GetTagsQuery } from '@/pages/api/tag/models';
import { Prisma, Tag } from '@prisma/client';
import set from 'lodash/set';

class TagApiService {
  private dbClient = prismaClient;
  private findManyArgs: Prisma.TagFindManyArgs = { select: { id: true, title: true } };

  public async getTags(query: GetTagsQuery): Promise<Partial<Tag>[]> {
    const { prefix } = query;

    if (prefix) {
      this.addPrefixFilterArgs(prefix);
    }

    return this.dbClient?.tag.findMany(this.findManyArgs);
  }

  private addPrefixFilterArgs(prefix: string): TagApiService {
    set(this.findManyArgs, 'where', {
      title: {
        startsWith: prefix,
        mode: 'insensitive',
      },
    });

    return this;
  }
}

const service = new TagApiService();
export default service;
