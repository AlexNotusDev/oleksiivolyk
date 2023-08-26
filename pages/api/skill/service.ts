import { NewSkillData } from '@/models/skill';
import prismaClient from '@/сlients/prismadbClient';
import unset from 'lodash/unset';
import { Prisma } from '.prisma/client';

class SkillApiService {
  private dbClient = prismaClient;

  public async createNewSkill(skillData: NewSkillData) {
    return this.dbClient?.skill.create({
      data: skillData,
    });
  }

  public async getSkills() {
    const skills = await this.dbClient?.skill.findMany({
      select: {
        id: true,
        title: true,
        img: true,
        frequencyInMonths: true,
        nextRevise: true,
        _count: {
          select: { questions: true },
        },
      },
      orderBy: {
        nextRevise: 'asc',
      },
    });

    return this.updateQuestionsCountField(skills);
  }

  public async getSkillById(id: string) {
    return this.dbClient?.skill.findUnique({
      where: {
        id: id,
      },
      include: {
        questions: true,
      },
    });
  }

  public async updateSkill(skillUpdateFields: Prisma.SkillWhereUniqueInput) {
    const { id } = skillUpdateFields;

    unset(skillUpdateFields, 'id');

    await this.dbClient.skill.update({
      where: {
        id,
      },
      data: skillUpdateFields,
    });
  }

  private updateQuestionsCountField(
    skills: {
      id: string;
      title: string;
      img: string;
      frequencyInMonths: number;
      nextRevise: Date;
      _count: { questions: number };
    }[],
  ) {
    return skills.map(({ id, title, img, frequencyInMonths, nextRevise, _count }) => {
      return { id, title, img, frequencyInMonths, nextRevise, questionsCount: _count?.questions };
    });
  }
}

const skillApiService = new SkillApiService();
export default skillApiService;
