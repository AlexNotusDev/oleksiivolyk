import axios from 'axios';
import { NewBlogData } from '@/models/blog';

const REVALIDATE_INTERVAL = 3600;
const urlForClient = '/api/blog';
const urlForSSR = `${process.env.apiUrl}/blog`;

class BlogClient {
  async createBlog(body: NewBlogData) {
    await axios.post(urlForClient, body);
  }

  async getBlogById(id: string) {
    const res = await fetch(`${urlForSSR}?id=${id}`, {
      next: { revalidate: REVALIDATE_INTERVAL },
    } as RequestInit);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  }

  async deleteBlog(id: string) {
    await axios.delete(`${urlForClient}?id=${id}`);
  }
}

const blogClient = new BlogClient();
export default blogClient;
