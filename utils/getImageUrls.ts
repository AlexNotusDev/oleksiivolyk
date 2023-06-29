import set from 'lodash/set';

export function getAllImagesFromROW(row): string[] {
  return Object.values(row.entityMap).map((imgObject) => {
    if (imgObject.type === 'IMAGE') {
      const imageSrc = imgObject?.data?.src;
      if (!imageSrc) {
        console.log('ERROR: imageSrc is undefined');
      }
      return imgObject?.data?.src;
    }
  });
}

export function replaceImgLinkWithKey(url, key, raw) {
  return {
    ...raw,
    entityMap: Object.values(raw.entityMap).map((imgObject) => {
      if (imgObject?.type === 'IMAGE' && imgObject?.data?.src === url) {
        return set(imgObject, 'data.src', key);
      } else {
        return imgObject;
      }
    }),
  };
}
