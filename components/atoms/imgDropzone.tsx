'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { resizeFile } from '@/utils/fileResize';
import { twMerge } from 'tailwind-merge';

export default function ImgDropzone({
  imageChangeEvent,
  image,
  wrapperStyles = '',
  imgStyles = '',
  changeButtonStyle = '',
  resizeParams = { width: 300, height: 300 },
}: ImgDropzoneProps) {
  const onDrop = useCallback(
    async (acceptedFiles: Blob[]) => {
      const resizedFile: string | Blob | File | ProgressEvent<FileReader> = await resizeFile({
        file: acceptedFiles[0],
        ...resizeParams,
        output: 'base64',
      });

      imageChangeEvent(resizedFile as string);
    },
    [imageChangeEvent],
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={twMerge(
        `${!image && 'border-1 border-gray-500'} rounded-md h-60 w-60 flex flex-none fill-gray-300 group relative`,
        wrapperStyles,
      )}
    >
      <input {...getInputProps()} />
      <Image
        src={image ? image : '/icons/image.svg'}
        alt='image load'
        fill={true}
        style={{ objectFit: 'cover' }}
        className={twMerge(`h-28 w-28 fill-gray-300 rounded-md ${image && 'border-1 border-gray-500'}`, imgStyles)}
      />
      <button
        className={twMerge(
          'transition transform ease-in-out invisible absolute group-hover:visible bg-black/70 mt-48 ml-20 text-white px-2 rounded-md',
          changeButtonStyle,
        )}
        onClick={open}
      >
        Change...
      </button>
    </div>
  );
}

type ImgDropzoneProps = {
  imageChangeEvent: (file: string) => void;
  image: string;
  wrapperStyles?: string;
  imgStyles?: string;
  changeButtonStyle?: string;
  resizeParams?: { height: number; width: number };
};
