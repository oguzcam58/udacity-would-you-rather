import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Poll extends Component {
  render() {
    const { users, question } = this.props;
    const user = users[question.author];
    return (
      <Row style={{margin: '20px'}}>
        <Col sm="3" align="center">
          <div>
            <Image src={user.avatarURL}
              roundedCircle
              width="50px"
              height="50px"
              />
              <span style={{ display: 'block' }} >{user.name}</span>
            </div>
        </Col>
        <Col sm="1">
          <span style={{ display: 'block', marginTop: '30px' }}>asks</span>
        </Col>
        <Col sm="8">
          <h4>Would you rather?</h4>
          <p>
            ...{question.optionOne.text}...
          </p>
          <Link to={`/questions/${question.id}`} variant="outline-primary">View Poll</Link>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps({ users, questions }, {questionId}) {
  return {
    users,
    question: questions[questionId],
  };
}

export default connect(mapStateToProps)(Poll);
