import React, { Component } from 'react';
import { connect } from 'react-redux';
import PollList from './PollList';

class HomePage extends Component {
  render() {
    const { answeredQuestionIds, unansweredQuestionIds } = this.props;

    return (
      <div>
        <h3>HomePage</h3>
        <PollList
          title="UnansweredQuestions"
          pollData={unansweredQuestionIds} />
        <PollList
          title="AnsweredQuestions"
          pollData={answeredQuestionIds} />
      </div>
    );
  }
}

const isAnswered = (question, user) => {
  return question.optionOne.votes.includes(user) || question.optionTwo.votes.includes(user);
}

function mapStateToProps ({ questions, authedUser }) {
  return {
    answeredQuestionIds: Object.keys(questions)
      .filter((id) => isAnswered(questions[id], authedUser))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    unansweredQuestionIds: Object.keys(questions)
      .filter((id) => !isAnswered(questions[id], authedUser))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
  }
}

export default connect(mapStateToProps)(HomePage);
