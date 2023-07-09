'use client';

import React, { useState } from 'react';
import { getAllImagesFromROW, replaceImgLinkWithKey } from '@/utils/getImageUrls';
import { useRouter } from 'next/navigation';
import blogClient from '@/сlients/blogClient';
import getUUID from '@/utils/uuid';
import { NEW_BLOG_BODY_LS_KEY, NEW_BLOG_HEADER_LS_KEY } from '@/utils/constants';
import dynamic from 'next/dynamic';
import S3Client from '@/сlients/S3Client';
import s3Client from '@/сlients/S3Client';

const DBlogBodyEditor = dynamic(() => import('@/components/atoms/editorWysiwyg'), {
  ssr: false,
});

const DBlogHeaderForm = dynamic(() => import('@/components/molekules/blogAddNewForm'), {
  ssr: false,
});

type ImageShort = {
  key: string;
  url: string;
};

enum ADDING_BLOG_STAGE {
  HEADER = 'HEADER',
  BODY = 'BODY',
}

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

    await s3Client.uploadS3Image(key, await file.arrayBuffer(), file.type);

    const url = await s3Client.getS3ImageUrl(key);

    setAddedImages((prevState) => prevState.concat({ url, key }));

    return { data: { link: url } };
  }

  async function saveBlogEventHandler(RawEditorState) {
    const updatedBlogRaw = await handleS3Images(RawEditorState);

    const newBlog = { ...blogHeaderValues, body: JSON.stringify(updatedBlogRaw) };

    try {
      await blogClient.createBlog(newBlog);

      localStorage.removeItem(NEW_BLOG_HEADER_LS_KEY);
      localStorage.removeItem(NEW_BLOG_BODY_LS_KEY);

      router.push('/blog');
    } catch (e) {
      console.log(e);
    }
  }

  async function handleS3Images(RAWEditorState) {
    const actualBlogImages = getAllImagesFromROW(RAWEditorState);

    for (const { key, url } of addedImages) {
      if (!actualBlogImages.includes(url)) {
        await S3Client.removeS3Image(key);
      } else {
        RAWEditorState = replaceImgLinkWithKey(url, key, RAWEditorState);
      }
    }

    return RAWEditorState;
  }

  switch (addingBlogStage) {
    case ADDING_BLOG_STAGE.HEADER:
      return (
        <DBlogHeaderForm
          cancelEvent={cancelHandler}
          submitEvent={submitHandler}
        />
      );
    case ADDING_BLOG_STAGE.BODY:
      return (
        <DBlogBodyEditor
          uploadImageEvent={imageUploadHandler}
          saveBlogEvent={saveBlogEventHandler}
          getBackEvent={getBackHandler}
          cancelEvent={cancelHandler}
        />
      );
  }
}
