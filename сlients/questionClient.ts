import axios from 'axios';

const url = '/api/question';

class QuestionClient {
  async addQuestion(body: QuestionWithSkillId) {
    try {
      const { data } = await axios.post(url, body);
      return data;
    } catch (e) {
      console.error(e);
    }
  }
}

const questionClient = new QuestionClient();
export default questionClient;
