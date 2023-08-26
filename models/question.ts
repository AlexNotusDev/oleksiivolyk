interface Question extends NewQuestionFormData {
  id: string;
}

interface NewQuestionFormData {
  text: string;
  answer: string;
}

interface QuestionWithSkillId extends NewQuestionFormData {
  skillId: string;
}
