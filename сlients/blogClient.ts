import axios from 'axios';

class BlogClient {
  async createBlog(body) {
    await axios.post(`${process.env.apiUrl}/blog`, body);
  }

  async getBlogById(id: string) {
    const res = await fetch(`${process.env.apiUrl}/blog?id=${id}`, { next: { revalidate: 3600 } } as RequestInit);
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
