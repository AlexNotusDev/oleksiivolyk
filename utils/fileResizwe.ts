import Resizer from 'react-image-file-resizer';

export const resizeFile = ({ file, width, height, output }) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width,
      height,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      output,
    );
  });
