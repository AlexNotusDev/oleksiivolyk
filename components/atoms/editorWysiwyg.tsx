'use client';

import dynamic from 'next/dynamic';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertFromRaw, convertToRaw, EditorState, RawDraftContentState } from 'draft-js';

import { useEffect, useState } from 'react';
import Button from '@/components/atoms/button';
import { NEW_BLOG_BODY_LS_KEY, NEW_BLOG_HEADER_LS_KEY } from '@/utils/constants';

const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false });

export default function BlogBodyEditor({
  uploadImageEvent,
  saveBlogEvent,
  cancelEvent,
  getBackEvent,
}: BlogBodyEditorProps) {
  const [needSaveEditorState, setNeedSaveEditorState] = useState<boolean>(true);

  let savedEditorSate;
  const state = localStorage.getItem(NEW_BLOG_BODY_LS_KEY);
  if (state) {
    savedEditorSate = EditorState.createWithContent(convertFromRaw(JSON.parse(state)));
  }

  const [editorState, setEditorState] = useState<EditorState>(savedEditorSate || EditorState.createEmpty());

  useEffect(() => {
    return () => {
      if (needSaveEditorState) {
        const content = convertToRaw(editorState.getCurrentContent());
        localStorage.setItem(NEW_BLOG_BODY_LS_KEY, JSON.stringify(content));
      } else {
        localStorage.removeItem(NEW_BLOG_HEADER_LS_KEY);
        localStorage.removeItem(NEW_BLOG_BODY_LS_KEY);
      }
    };
  });

  function onEditorStateChange(editorState: any) {
    setEditorState(editorState);
  }

  function saveBlog(): void {
    setNeedSaveEditorState(false);
    saveBlogEvent(convertToRaw(editorState.getCurrentContent()));
  }

  function cancelHandler() {
    setNeedSaveEditorState(false);
    cancelEvent();
  }

  async function uploadImageCallBack(file: File): Promise<ImageLink | void> {
    try {
      return await uploadImageEvent(file);
    } catch (e) {
      console.log('ERROR:', e);
    }
  }

  return (
    <Editor
      editorState={editorState}
      wrapperClassName='editorWrap'
      editorClassName='editor'
      toolbarClassName='toolbar'
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        image: {
          urlEnabled: true,
          uploadEnabled: true,
          uploadCallback: uploadImageCallBack,
          previewImage: true,
          alt: { present: false, mandatory: false },
        },
      }}
      toolbarCustomButtons={[
        <Button
          key='1'
          text='Save'
          styles='bg-green-600 h-6 w-20 text-white ml-4'
          clickEvent={saveBlog}
        />,
        <Button
          key='2'
          text='Cancel'
          styles='bg-red-600 h-6 w-20 text-white ml-2'
          clickEvent={cancelHandler}
        />,
        <Button
          key='3'
          text='Back'
          styles='bg-yellow-400 h-6 w-20 text-white ml-2'
          clickEvent={getBackEvent}
        />,
      ]}
    />
  );
}

type BlogBodyEditorProps = {
  uploadImageEvent: (file: File) => Promise<ImageLink>;
  saveBlogEvent: (raw: any) => void;
  cancelEvent: () => void;
  getBackEvent: () => void;
};

type ImageLink = { data: { link: string } };
