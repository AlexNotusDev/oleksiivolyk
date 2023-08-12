import * as Yup from 'yup';
import { Shape } from '@/utils/schemaYupTs';
import { GetTagsQuery } from '@/pages/api/tag/models';

export const getTagsSchema = Yup.object<Shape<GetTagsQuery>>({
  prefix: Yup.string(),
});
