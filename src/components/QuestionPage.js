import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Row, Col, Image, Button, Form } from 'react-bootstrap';
import { handleSaveAnswer } from '../actions/shared';

class QuestionPage extends Component {
  state = {
    selectedOption: '',
  }

  handleOptionChange = (e) => {
    this.setState({ selectedOption: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { selectedOption } = this.state;
    this.props.dispatch(handleSaveAnswer(this.props.question, selectedOption));
  }

  render() {
    const { selectedOption } = this.state;
    const { author, loggedInUser, question } = this.props;

    if (question === null) {
      return (
        <Alert variant="warning">
          There is no question defined with the specified id.
        </Alert>
      )
    }

    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const optionOnePercentage = (optionOneVotes / totalVotes * 100).toFixed();
    const givenAnswer = loggedInUser.answers[question.id];

    return (
      <div style={{margin: '20px'}}>
        <Row>
          <Col sm="4">
            <Image src={author.avatarURL}
              roundedCircle
              width="50px"
              height="50px"
              style={{marginRight: '20px'}} />
              {author.name} asks
          </Col>
          {!givenAnswer && (
            <Col sm="8">
              <Form onSubmit={this.handleSubmit}>
                <h3>Would you rather ...</h3>
                <Form.Check
                  name="option"
                  value="optionOne"
                  onChange={this.handleOptionChange}
                  checked={selectedOption === 'optionOne'}
                  type="radio"
                  id="optionOne"
                  label={question.optionOne.text}
                />
                <Form.Check
                  name="option"
                  value="optionTwo"
                  onChange={this.handleOptionChange}
                  checked={selectedOption === 'optionTwo'}
                  type="radio"
                  id="optionTwo"
                  label={question.optionTwo.text}
                />
                <Button variant="outline-primary" style={{margin: '10px'}} type="submit">Submit</Button>
              </Form>
            </Col>
          )}
          {givenAnswer && (
            <Col sm="8">
              <Alert variant={givenAnswer === 'optionOne' ? 'success' : 'light'}>
                <div>
                  <p>Would you rather {question.optionOne.text}?</p>
                  <span>{optionOnePercentage}% voted. </span>
                  <span>{optionOneVotes} out of {totalVotes}. </span>
                  {givenAnswer === 'optionOne' && (
                    <span>You voted for this option.</span>
                  )}
                </div>
              </Alert>
              <Alert variant={givenAnswer === 'optionTwo' ? 'success' : 'light'}>
                <div>
                  <p>Would you rather {question.optionTwo.text}?</p>
                  <span>{100 - optionOnePercentage}% voted.</span>
                  <span>{optionTwoVotes} out of {totalVotes}. </span>
                  {loggedInUser.answers[question.id] === 'optionTwo' && (
                    <span>You voted for this option.</span>
                  )}
                </div>
              </Alert>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser, questions }, props) {
  const { id } = props.match.params;

  return {
    loggedInUser: users[authedUser],
    author: !questions[id] ? null : users[questions[id].author],
    question: !questions[id] ? null : questions[id],
  }
}

export default connect(mapStateToProps)(QuestionPage);
