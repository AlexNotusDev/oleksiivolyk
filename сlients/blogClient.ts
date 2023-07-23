import axios from 'axios';
import { BlogPartial } from '@/components/organisms/newBlogInterface';

const REVALIDATE_INTERVAL = 3600;

const urlForClient = '/api/blog';
const urlForSSR = `${process.env.apiUrl}/blog`;

class BlogClient {
  async createBlog(body: BlogPartial) {
    await axios.post(urlForClient, body);
  }

  async getBlogById(id: string) {
    const res = await fetch(`${urlForSSR}?id=${id}`, {
      next: { revalidate: REVALIDATE_INTERVAL },
    } as RequestInit);
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
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
