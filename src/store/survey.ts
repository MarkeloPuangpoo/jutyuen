import { create } from 'zustand'

export type Answer = {
  question_id: string
  raw_score: number
  time_spent_ms: number
}

type SurveyState = {
  sessionId: string | null
  answers: Record<string, Answer>
  setSessionId: (id: string) => void
  setAnswer: (questionId: string, score: number, timeSpent: number) => void
  getAnswersArray: () => Answer[]
}

export const useSurveyStore = create<SurveyState>((set, get) => ({
  sessionId: null,
  answers: {},
  setSessionId: (id) => set({ sessionId: id }),
  setAnswer: (questionId, score, timeSpent) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: {
          question_id: questionId,
          raw_score: score,
          time_spent_ms: timeSpent,
        },
      },
    })),
  getAnswersArray: () => Object.values(get().answers),
}))
