'use server';

import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import set from 'lodash/set';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { BlogFindManyArgs } from '.prisma/client';

class BlogApiService {
  private s3Client: S3Client;
  private bucket: string;

  constructor() {
    this.s3Client = new S3Client({
      credentials: {
        accessKeyId: process.env.awsAccessKey,
        secretAccessKey: process.env.awsSecretAccessKey,
      },
      region: process.env.awsRegion,
    });
    this.bucket = process.env.awsBucketName;
  }

  async createNewBlog(body) {
    await prisma?.blog.create({
      data: body,
    });
  }

  async getBlogs(query) {
    let { limit, page } = query;

    let requestArgs: BlogFindManyArgs = {
      orderBy: [{ createdAt: 'desc' }, { category: 'desc' }],
      select: { id: true, img: true, title: true, description: true, category: true, createdAt: true },
    };

    if (page && limit) {
      limit = +limit;
      page = +page;
      if (page > 0) {
        requestArgs = { ...requestArgs, skip: page * limit, take: limit };
      } else {
        requestArgs = { ...requestArgs, take: limit };
      }
    }

    return prisma?.blog.findMany(requestArgs);
  }

  async getBlogById(id: string) {
    const blog = await prisma?.blog.findUnique({
      where: { id },
      select: { title: true, body: true, createdAt: true },
    });

    const blogWithActualSrcUrls = await this.prepareLinksForImages(blog);

    return blogWithActualSrcUrls;
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
