import axios from 'axios';
import { NewSkillData, Skill } from '@/models/skill';

const url = '/api/skill';

class SkillClient {
  async createBlog(body: NewSkillData) {
    try {
      const { data } = await axios.post(url, body);
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getSkills() {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getSkillById(id: string) {
    try {
      const { data } = await axios.get(`${url}?id=${id}`);
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async updateReviseDate(pathData: Partial<Skill>) {
    try {
      await axios.patch(url, pathData);
    } catch (e) {
      console.error(e);
    }
  }
}

const skillClient = new SkillClient();
export default skillClient;
