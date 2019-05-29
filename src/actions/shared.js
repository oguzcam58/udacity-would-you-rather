import { getInitialData } from '../utils/api';
import { receiveUsers, addQuestionToUser, addAnswerToUser } from './users';
import { receiveQuestions, addQuestion, addAnswerToQuestion } from './questions';
import { showLoading, hideLoading } from 'react-redux-loading';
import { saveQuestion, saveQuestionAnswer } from '../utils/api';

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(hideLoading());
      });
  };
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion({
      author: authedUser,
      optionOneText,
      optionTwoText,
    })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(authedUser, question.id));
      })
      .then(() => dispatch(hideLoading()));
  }
}

export function handleSaveAnswer (question, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestionAnswer({
      authedUser: authedUser,
      qid: question.id,
      answer,
    })
      .then(() => {
        dispatch(addAnswerToQuestion(question.id, answer, authedUser));
        dispatch(addAnswerToUser(authedUser, question.id, answer));
      })
      .then(() => dispatch(hideLoading()));
  }
}
