import axios from 'axios';

const REVALIDATE_INTERVAL = 3600;

class BlogClient {
  async createBlog(body) {
    await axios.post(`${process.env.apiUrl}/blog`, body);
  }

  async getBlogById(id: string) {
    const res = await fetch(`${process.env.apiUrl}/blog?id=${id}`, {
      next: { revalidate: REVALIDATE_INTERVAL },
    } as RequestInit);
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }

    return res.json();
  }
}

const blogClient = new BlogClient();
export default blogClient;
