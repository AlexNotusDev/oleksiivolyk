'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { resizeFile } from '@/utils/fileResize';

export default function ImgDropzone({ imageChangeEvent, image }: ImgDropzoneProps) {
  const onDrop = useCallback(
    async (acceptedFiles: Blob[]) => {
      const resizedFile: string | Blob | File | ProgressEvent<FileReader> = await resizeFile({
        file: acceptedFiles[0],
        height: 300,
        width: 300,
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
      className={`${
        !image && 'border-1 border-gray-500'
      } rounded-md h-60 w-60 flex flex-none fill-gray-300 group relative`}
    >
      <input {...getInputProps()} />
      <Image
        src={image ? image : '/icons/image.svg'}
        alt='image load'
        fill={true}
        style={{ objectFit: 'cover' }}
        className={`h-28 w-28 fill-gray-300 rounded-md ${image && 'border-1 border-gray-500'}`}
      />
      <button
        className='transition transform
            ease-in-out invisible
            absolute group-hover:visible bg-black/70 mt-48 ml-20
            text-white px-2 rounded-md '
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
};
