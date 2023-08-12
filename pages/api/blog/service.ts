'use server';

import set from 'lodash/set';
import { AWS_URL_LINK_EXPIRE_TIME, BlogCategory } from '@/utils/constants';
import s3Client from '@/сlients/S3Client';
import { Blog, Prisma } from '@prisma/client';

import { RawDraftContentState } from 'draft-js';
import prismaClient from '@/сlients/prismadbClient';
import { getAllImagesFromROW } from '@/utils/getImageUrls';
import { NewBlogData } from '@/models/blog';
import { Tag } from '@/models/tag';

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

  public async createNewBlog(body: NewBlogData) {
    const dataWithTagsQuery = this.updateDataForTags(body);

    await this.dbClient?.blog.create({
      data: dataWithTagsQuery,
    });
  }

  public async getBlogs(query: QueryParams) {
    this.addOrderAndSelectArgs().addPaginationArgs(query).addFilterArgs(query);

    return this.dbClient?.blog.findMany(this.findManyArgs);
  }

  public async getBlogById(id: string): Promise<BlogShort | null> {
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

  public async deleteBlog(id: string): Promise<void> {
    const blog: { body: string } | null | undefined = await this.dbClient?.blog.findUnique({
      where: { id },
      select: { body: true },
    });

    if (blog) {
      const parsedBody = JSON.parse(blog?.body);

      const imagesKeys = getAllImagesFromROW(parsedBody);

      if (imagesKeys.length) {
        await this.deleteBlogImages(imagesKeys);
      }

      await this.dbClient?.blog.delete({
        where: { id },
      });
    }
  }

  private addOrderAndSelectArgs() {
    this.findManyArgs = {
      orderBy: [{ createdAt: 'desc' }, { category: 'desc' }],
      select: {
        id: true,
        img: true,
        title: true,
        description: true,
        category: true,
        createdAt: true,
        tags: { select: { id: true, title: true } },
      },
    };

    return this;
  }

  private addPaginationArgs({ limit, page }: Pick<QueryParams, 'limit' | 'page'>) {
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

  private addFilterArgs({ category, searchInput }: Pick<QueryParams, 'category' | 'searchInput'>) {
    const filters: Prisma.BlogWhereInput = {};
    if (category !== BlogCategory.ALL) {
      filters['category'] = category;
    }

    if (searchInput) {
      filters['OR'] = [
        { title: { contains: searchInput, mode: 'insensitive' } },
        { description: { contains: searchInput, mode: 'insensitive' } },
      ];
    }

    this.findManyArgs = { ...this.findManyArgs, where: filters };

    return this;
  }

  private async prepareLinksForImages(blog: BlogShort): Promise<BlogShort> {
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

  private async deleteBlogImages(imagesKeys: string[]) {
    await Promise.all(
      imagesKeys.map(async (key) => {
        await s3Client.removeS3Image(key);
      }),
    );
  }

  private updateDataForTags(newBlogBody: NewBlogData): Prisma.BlogCreateInput {
    const { img, title, description, tags, body = '', category } = newBlogBody;
    const newTags: Prisma.TagCreateWithoutBlogsInput[] = [];
    const connectTags: Prisma.TagWhereUniqueInput[] = [];

    tags?.forEach(({ title, id, isNew }: Tag) => {
      if (isNew) {
        newTags.push({ title });
      } else {
        connectTags.push({ id });
      }
    });

    const tagsQuery: Prisma.BlogCreateInput = { img, title, description, body, category };

    if (newTags.length) {
      set(tagsQuery, 'create', newTags);
    }

    if (connectTags.length) {
      set(tagsQuery, 'connect', connectTags);
    }

    return tagsQuery;
  }
}

const service = new BlogApiService();
export default service;
