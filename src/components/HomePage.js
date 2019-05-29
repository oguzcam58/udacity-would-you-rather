import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Poll from './Poll';

class HomePage extends Component {
  render() {
    const { answeredQuestionIds, unansweredQuestionIds } = this.props;

    return (
      <Tabs
        defaultActiveKey="unansweredQuestions"
        id="uncontrolled-tab-example">
        <Tab
          eventKey="unansweredQuestions"
          title="Unanswered Questions">
          {unansweredQuestionIds.map((id) => (
            <Poll questionId={id} key={id} />
          ))}
        </Tab>
        <Tab
          eventKey="answeredQuestions"
          title="Answered Questions">
          {answeredQuestionIds.map((id) => (
            <Poll questionId={id} key={id} />
          ))}
        </Tab>
      </Tabs>
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
