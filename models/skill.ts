export interface NewSkillFormData {
  title: string;
  img: string;
  frequencyInMonths: number;
}

export interface NewSkillData extends NewSkillFormData {
  nextRevise: Date;
}

export interface Skill extends NewSkillData {
  id: string;
  questionsCount?: number;
  questions?: Question[];
}

export interface SkillWithStatus extends Skill {
  status?: SkillStatus;
  statusMessage?: string;
}

export enum SkillStatus {
  NEED_REVISE = 'NEED_REVISE',
  REVISE_IN = 'REVISE_IN',
  REVISE_SOON = 'REVISE_SOON',
  IN_PROGRESS = 'IN_PROGRESS',
}
