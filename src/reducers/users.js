import { RECEIVE_USERS, ADD_QUESTION_TO_USER, ADD_ANSWER_TO_USER } from '../actions/users';

export default function users (state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_QUESTION_TO_USER:
      return {
        ...state,
        [action.user]: {
          ...state[action.user],
          questions: state[action.user].questions.concat([action.questionId]),
        },
      };
    case ADD_ANSWER_TO_USER:
      const { user, questionId, answer } = action;

      return {
        ...state,
        [user]: {
          ...state[user],
          answers: {
            ...state[user].answers,
            [questionId]: answer,
          },
        },
      };
    default:
      return state;
  }
}
