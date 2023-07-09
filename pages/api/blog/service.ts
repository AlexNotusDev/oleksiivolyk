'use server';

import set from 'lodash/set';
import { BlogFindManyArgs } from '.prisma/client';
import { AWS_URL_LINK_EXPIRE_TIME, BlogCategory } from '@/utils/constants';
import s3Client from '@/сlients/S3Client';

class BlogApiService {
  private findManyArgs: BlogFindManyArgs;

  constructor() {
    this.findManyArgs = this.addOrderAndSelectArgs();
  }

  async createNewBlog(body) {
    await prisma?.blog.create({
      data: body,
    });
  }

  addOrderAndSelectArgs() {
    return {
      orderBy: [{ createdAt: 'desc' }, { category: 'desc' }],
      select: { id: true, img: true, title: true, description: true, category: true, createdAt: true },
    };
  }

  async getBlogs(query) {
    this.addPaginationArgs(query).addFilterArgs(query);

    const blogs = await prisma?.blog.findMany(this.findManyArgs);

    this.findManyArgs = this.addOrderAndSelectArgs();

    return blogs;
  }

  addPaginationArgs({ limit, page }) {
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

  addFilterArgs({ category, searchInput }) {
    const filters = {};
    if (category == BlogCategory.LIFE || category == BlogCategory.TECH) {
      filters['category'] = category;
    }

    if (searchInput) {
      filters['OR'] = [{ title: { contains: searchInput } }, { description: { contains: searchInput } }];
    }

    this.findManyArgs = { ...this.findManyArgs, where: filters };

    return this;
  }

  async getBlogById(id: string) {
    const blog = await prisma?.blog.findUnique({
      where: { id },
      select: { title: true, body: true, createdAt: true },
    });

    return this.prepareLinksForImages(blog);
  }

  async prepareLinksForImages(blog) {
    const { body } = blog;
    const parsedBody = JSON.parse(body);

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
