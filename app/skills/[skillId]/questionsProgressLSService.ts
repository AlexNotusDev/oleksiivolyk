import { SKILL_QUESTIONS_PROGRESS_LS_KEY } from '@/utils/constants';
import unset from 'lodash/unset';

class QuestionProgressLSService {
  public updateQuestionsProgress(skillId: string, questionsId: string) {
    const state = this.getPrevState();

    if (state[skillId]) {
      state[skillId].push(questionsId);
    } else {
      state[skillId] = [questionsId];
    }

    this.setNewState({ ...state });
  }

  public removeQuestionsProgress(skillId: string) {
    const state = this.getPrevState();
    unset(state, skillId);

    this.setNewState(state);
  }

  public retrieveSkillQuestionsProgress(skillId: string) {
    const state = this.getPrevState();

    return state[skillId];
  }

  private getPrevState() {
    const state = localStorage.getItem(SKILL_QUESTIONS_PROGRESS_LS_KEY);
    return state ? JSON.parse(state) : {};
  }

  private setNewState(state: { [key: string]: string[] }) {
    localStorage.setItem(SKILL_QUESTIONS_PROGRESS_LS_KEY, JSON.stringify(state));
  }
}

const questionProgressLSService = new QuestionProgressLSService();
export default questionProgressLSService;
