import Resizer from 'react-image-file-resizer';

export const resizeFile = ({
  file,
  width,
  height,
  output,
}: ResizeFileProps): Promise<string | Blob | File | ProgressEvent<FileReader>> =>
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

type ResizeFileProps = {
  file: Blob;
  width: number;
  height: number;
  output: string;
};
