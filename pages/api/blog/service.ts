'use server';

import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import set from 'lodash/set';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { BlogFindManyArgs } from '.prisma/client';
import { BlogCategory } from '@/utils/constants';

class BlogApiService {
  private readonly s3Client: S3Client;
  private readonly bucket: string;
  private findManyArgs: BlogFindManyArgs;

  constructor() {
    this.s3Client = new S3Client({
      credentials: {
        accessKeyId: process.env.awsAccessKey,
        secretAccessKey: process.env.awsSecretAccessKey,
      },
      region: process.env.awsRegion,
    });
    this.bucket = process.env.awsBucketName;
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
          const getObjectParams = {
            Bucket: this.bucket,
            Key: imgObject?.data?.src,
          };

          const getCommand = new GetObjectCommand(getObjectParams);
          const url = await getSignedUrl(this.s3Client, getCommand, { expiresIn: 3600 });
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
