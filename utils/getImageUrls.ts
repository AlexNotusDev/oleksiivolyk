import set from 'lodash/set';
import { RawDraftContentState, RawDraftEntity } from 'draft-js';

export function getAllImagesFromROW(raw: RawDraftContentState): string[] {
  return Object.values(raw.entityMap)
    .filter((imgObject) => imgObject.type === 'IMAGE')
    .map((imgObject) => {
      const imageSrc = imgObject?.data?.src;
      if (!imageSrc) {
        console.log('ERROR: imageSrc is undefined');
      }
      return imgObject?.data?.src;
    });
}

export function replaceImgLinkWithKey(url: string, key: string, raw: RawDraftContentState): RawDraftContentState {
  const updatedEntityMap: { [key: string]: RawDraftEntity } = {};

  for (const [key, value] of Object.entries(raw.entityMap)) {
    const isHasImageWithUrl = value?.type === 'IMAGE' && value?.data?.src === url;
    updatedEntityMap[key] = isHasImageWithUrl ? set(value, 'data.src', key) : value;
  }

  return {
    ...raw,
    entityMap: updatedEntityMap,
  };
}
