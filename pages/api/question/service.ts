import prismaClient from '@/сlients/prismadbClient';

class QuestionApiService {
  private dbClient = prismaClient;

  async addQuestion(question: QuestionWithSkillId) {
    const { text, answer, skillId } = question;
    const query = { data: { text, answer, skill: { connect: { id: skillId } } } };

    return this.dbClient.question.create(query);
  }
}

const questionApiService = new QuestionApiService();
export default questionApiService;
