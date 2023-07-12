'use server';

import set from 'lodash/set';
import { AWS_URL_LINK_EXPIRE_TIME, BlogCategory } from '@/utils/constants';
import s3Client from '@/сlients/S3Client';
import { Blog, Prisma } from '@prisma/client';

import { RawDraftContentState } from 'draft-js';
import prismaClient from '@/сlients/prismadbClient';

type BlogShort = Pick<Blog, 'title' | 'body' | 'createdAt'>;

type QueryParams = {
  limit?: number;
  page?: number;
  category?: string;
  searchInput?: string;
};

class BlogApiService {
  private findManyArgs: Prisma.BlogFindManyArgs = {};
  private dbClient = prismaClient;

  constructor() {
    this.addOrderAndSelectArgs();
  }

  async createNewBlog(body: Blog) {
    await this.dbClient?.blog.create({
      data: body,
    });
  }

  addOrderAndSelectArgs() {
    this.findManyArgs = {
      orderBy: [{ createdAt: 'desc' }, { category: 'desc' }],
      select: { id: true, img: true, title: true, description: true, category: true, createdAt: true },
    };

    return this;
  }

  async getBlogs(query: QueryParams) {
    this.addOrderAndSelectArgs().addPaginationArgs(query).addFilterArgs(query);

    return this.dbClient?.blog.findMany(this.findManyArgs);
  }

  addPaginationArgs({ limit, page }: Pick<QueryParams, 'limit' | 'page'>) {
    if (page && limit) {
      limit = +limit;
      page = +page;
      if (page > 0) {
        this.findManyArgs = { ...this.findManyArgs, skip: page * limit, take: limit };
      } else {
        this.findManyArgs = { ...this.findManyArgs, take: limit };
      }
    }

    return this;
  }

  addFilterArgs({ category, searchInput }: Pick<QueryParams, 'category' | 'searchInput'>) {
    const filters: Prisma.BlogWhereInput = {};
    if (category !== BlogCategory.ALL) {
      filters['category'] = category;
    }

    if (searchInput) {
      filters['OR'] = [{ title: { contains: searchInput } }, { description: { contains: searchInput } }];
    }

    this.findManyArgs = { ...this.findManyArgs, where: filters };

    return this;
  }

  async getBlogById(id: string): Promise<BlogShort | null> {
    const blog: BlogShort | null | undefined = await this.dbClient?.blog.findUnique({
      where: { id },
      select: { title: true, body: true, createdAt: true },
    });

    if (blog) {
      return this.prepareLinksForImages(blog);
    } else {
      return null;
    }
  }

  async prepareLinksForImages(blog: BlogShort): Promise<BlogShort> {
    const { body } = blog;
    const parsedBody: RawDraftContentState = JSON.parse(body);

    const newEntityMap = await Promise.all(
      Object.values(parsedBody.entityMap).map(async (imgObject) => {
        if (imgObject?.type === 'IMAGE') {
          const key = imgObject?.data?.src;

          const url = await s3Client.getS3ImageUrl(key, AWS_URL_LINK_EXPIRE_TIME);
          return set(imgObject, 'data.src', url);
        } else {
          return imgObject;
        }
      }),
    );

    return set(blog, 'body', { ...parsedBody, entityMap: newEntityMap });
  }
}

const service = new BlogApiService();
export default service;
