'use client';

import { useState } from 'react';
import BlogHeaderForm from '@/components/molekules/blogAddNewForm';
import BlogBodyEditor from '@/components/atoms/editorWysiwyg';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { convertToRaw } from 'draft-js';
import { getAllImagesFromROW, replaceImgLinkWithKey } from '@/utils/getImageUrls';
import { useRouter } from 'next/navigation';
import blogClient from '@/сlients/blogClient';
import getUUID from '@/utils/uuid';
import { NEW_BLOG_BODY_LS_KEY, NEW_BLOG_HEADER_LS_KEY } from '@/utils/constants';

type ImageShort = {
  key: string;
  url: string;
};

enum ADDING_BLOG_STAGE {
  HEADER = 'HEADER',
  BODY = 'BODY',
}

const bucket = process.env.awsBucketName;

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.awsAccessKey,
    secretAccessKey: process.env.awsSecretAccessKey,
  },
  region: process.env.awsRegion,
});

export default function NewBlogInterface() {
  const [addingBlogStage, setAddingBlogStage] = useState<ADDING_BLOG_STAGE>(ADDING_BLOG_STAGE.HEADER);
  const [addedImages, setAddedImages] = useState<ImageShort[]>([]);
  const [blogHeaderValues, setBlogHeaderValues] = useState(null);
  const router = useRouter();

  function cancelHandler() {
    router.push('/blog');
  }

  function submitHandler(values) {
    setBlogHeaderValues(values);
    setAddingBlogStage(ADDING_BLOG_STAGE.BODY);
  }

  function getBackHandler() {
    setAddingBlogStage(ADDING_BLOG_STAGE.HEADER);
  }

  async function imageUploadHandler(file: File) {
    const id = await getUUID();
    const key = `${file.name}_${id}`;
    const params = {
      Bucket: bucket,
      Key: key,
      Body: await file.arrayBuffer(),
      ContentType: file.type,
    };

    const putCommand = new PutObjectCommand(params as PutObjectCommandInput);
    try {
      await s3Client.send(putCommand);
    } catch (e) {
      console.log('ERROR', e);
    }

    const getObjectParams = {
      Bucket: bucket,
      Key: key,
    };

    const getCommand = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3Client, getCommand);

    setAddedImages((prevState) => prevState.concat({ url, key }));

    return { data: { link: url } };
  }

  async function saveBlogEventHandler(editorState) {
    let ROWEditorState = convertToRaw(editorState.getCurrentContent());
    const actualBlogImages = getAllImagesFromROW(ROWEditorState);

    for (const { key, url } of addedImages) {
      if (!actualBlogImages.includes(url)) {
        const deleteParams = {
          Bucket: bucket,
          Key: key,
        };

        const deleteCommand = new DeleteObjectCommand(deleteParams);

        try {
          await s3Client.send(deleteCommand);
        } catch (e) {
          console.log(`ERROR for ${key}`, e);
        }
      } else {
        ROWEditorState = replaceImgLinkWithKey(url, key, ROWEditorState);
      }
    }

    const newBlog = { ...blogHeaderValues, body: JSON.stringify(ROWEditorState) };

    try {
      await blogClient.createBlog(newBlog);
      localStorage.removeItem(NEW_BLOG_HEADER_LS_KEY);
      localStorage.removeItem(NEW_BLOG_BODY_LS_KEY);
      router.push('/blog');
    } catch (e) {
      console.log(e);
    }
  }

  switch (addingBlogStage) {
    case ADDING_BLOG_STAGE.HEADER:
      return (
        <BlogHeaderForm
          cancelEvent={cancelHandler}
          submitEvent={submitHandler}
        />
      );
    case ADDING_BLOG_STAGE.BODY:
      return (
        <BlogBodyEditor
          uploadImageEvent={imageUploadHandler}
          saveBlogEvent={saveBlogEventHandler}
          getBackEvent={getBackHandler}
          cancelEvent={cancelHandler}
        />
      );
  }
}
