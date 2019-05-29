import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Image, Button, Dropdown } from 'react-bootstrap';
import { setAuthedUser } from '../actions/authedUser';

class LoginPage extends Component {
  state = {
    selectedUserId: null,
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { selectedUserId } = this.state;
    this.props.dispatch(setAuthedUser(selectedUserId));
  }

  handleChoice = (e, userId) => {
    e.preventDefault();
    this.setState({ selectedUserId: userId });
  }

  render() {
    const { selectedUserId } = this.state;
    const { users } = this.props;

    return (
      <Container align='center' style={{ marginTop: '10px'}}>
        <Row>
          <Col sm='12'>
            <h3>Welcome to Would You Rather App</h3>
          </Col>
        </Row>
        <Row>
          <Col sm='12'>
            You need to sign in to continue...
          </Col>
        </Row>
        {selectedUserId !== null && (
          <Row style={{ margin: '20px'}}>
            <Col sm='12'>
              <Image src={users[selectedUserId].avatarURL} roundedCircle width="50px" height="50px" style={{ marginRight: '10px' }}/>
              <span style={{ display: 'block' }}>{users[selectedUserId].name}</span>
            </Col>
          </Row>
        )}
        <Row style={{ margin: '20px'}}>
          <Col sm='12'>
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                Choose your user!
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {Object.keys(users).map((userId) => (
                  <Dropdown.Item key={userId} data={userId} onClick={(e) => this.handleChoice(e, userId)}>
                    <Image src={users[userId].avatarURL} roundedCircle width="50px" height="50px" style={{ marginRight: '10px' }}/>
                    {users[userId].name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Button onClick={this.handleLogin} variant="outline-primary">Login</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(LoginPage);
