import { BlogCategory } from '@/enums/BlogCategory';

export interface Blog {
  id: string;
  img: string;
  title: string;
  description: string;
  createdAt: Date;
  category: BlogCategory;
}
