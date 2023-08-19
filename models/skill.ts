export interface NewSkill {
  title: string;
  img: string;
  frequencyInMonth: number;
}

export interface Skill extends NewSkill {
  id: string;
  numberOfQuestions: number;
  lastRefresh: Date;
}

export interface SkillWithStatus extends Skill {
  status?: SkillStatus;
  statusMessage?: string;
}

export enum SkillStatus {
  NEED_REFRESH = 'NEED_REFRESH',
  REFRESH_IN = 'REFRESH_IN',
  REFRESH_SOON = 'REFRESH_SOON',
}
