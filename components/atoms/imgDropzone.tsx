'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { resizeFile } from '@/utils/fileResizwe';

export default function ImgDropzone({ imageChangeEvent, image }) {
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const resizedFile = await resizeFile({
        file: acceptedFiles[0],
        height: 300,
        width: 300,
        output: 'base64',
      });

      imageChangeEvent(resizedFile);
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
        src={image ? image : '/image.svg'}
        alt='image load'
        fill={true}
        style={{ objectFit: 'cover' }}
        className={`h-28 w-28 fill-gray-300 rounded-md ${
          image && 'border-1 border-gray-500'
        }`}
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
