'use client';

import React, { useState } from 'react';
import { getAllImagesFromROW, replaceImgLinkWithKey } from '@/utils/getImageUrls';
import { useRouter } from 'next/navigation';
import blogClient from '@/сlients/blogClient';
import getUUID from '@/utils/uuid';
import { NEW_BLOG_BODY_LS_KEY, NEW_BLOG_HEADER_LS_KEY } from '@/utils/constants';
import dynamic from 'next/dynamic';
import s3Client from '@/сlients/S3Client';
import { RawDraftContentState } from 'draft-js';
import tagClient from '@/сlients/tagClient';
import { NewBlogData } from '@/models/blog';
import { Tag } from '@/models/tag';

const DBlogBodyEditor = dynamic(() => import('@/components/molecules/editorWysiwyg'), {
  ssr: false,
});

const DBlogHeaderForm = dynamic(() => import('@/components/molecules/blogAddNewForm'), {
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
  const [blogHeaderValues, setBlogHeaderValues] = useState<NewBlogData | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const router = useRouter();

  async function cancelHandler() {
    for (const { key } of addedImages) {
      await s3Client.removeS3Image(key);
    }

    router.push('/blog');
  }

  function submitHandler(values: NewBlogData) {
    setBlogHeaderValues(values);
    setAddingBlogStage(ADDING_BLOG_STAGE.BODY);
  }

  async function searchTagsHandler(input: string): Promise<void> {
    try {
      setTags(await tagClient.getTagsByPrefix(input));
    } catch (e) {
      console.log(e);
    }
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

  async function saveBlogEventHandler(RawEditorState: RawDraftContentState) {
    const updatedBlogRaw = await handleS3Images(RawEditorState);

    const newBlog = { ...blogHeaderValues, body: JSON.stringify(updatedBlogRaw) } as NewBlogData;

    try {
      await blogClient.createBlog(newBlog);

      localStorage.removeItem(NEW_BLOG_HEADER_LS_KEY);
      localStorage.removeItem(NEW_BLOG_BODY_LS_KEY);

      router.push('/blog');
    } catch (e) {
      console.log(e);
    }
  }

  async function handleS3Images(RAWEditorState: RawDraftContentState) {
    const actualBlogImages = getAllImagesFromROW(RAWEditorState);

    for (const { key, url } of addedImages) {
      if (!actualBlogImages.includes(url)) {
        await s3Client.removeS3Image(key);
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
          searchTagsEvent={searchTagsHandler}
          tags={tags}
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
