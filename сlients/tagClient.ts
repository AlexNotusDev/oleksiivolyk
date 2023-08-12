import axios from 'axios';

const url = '/api/tag';

class TagClient {
  async getTagsByPrefix(prefix: string) {
    if (prefix.length) {
      const { data } = await axios.get(`${url}?prefix=${prefix}`);
      return data;
    } else {
      return [];
    }
  }
}

const tagClient = new TagClient();
export default tagClient;
