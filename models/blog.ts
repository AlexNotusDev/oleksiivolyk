import { Tag } from '@/models/tag';

export interface Blog extends NewBlogData {
  id: string;
  createdAt: Date;
  body: string;
  tags: Tag[];
}

export interface NewBlogData {
  img: string;
  title: string;
  description: string;
  category: string;
  body?: string;
  tags?: Tag[];
}
