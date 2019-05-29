import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { handleAddQuestion } from '../actions/shared';
import { connect } from 'react-redux';

class AddQuestionPage extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,
  };

  handleChange = (e, name) => {
    const value = e.target.value;

    this.setState(() => ({
      [name]: value
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOne, optionTwo } = this.state;

    this.props.dispatch(handleAddQuestion(optionOne, optionTwo));

    this.setState(() => ({
      toHome: true,
    }));
  }

  render() {
    const { optionOne, optionTwo, toHome } = this.state;

    if (toHome === true) {
      return (<Redirect to='/' />);
    }

    return (
      <Form className="container" onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Text className="header">
            <h3>Create New Question</h3>
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Would you rather?</Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label>First Option</Form.Label>
          <Form.Control
            value={optionOne}
            onChange={(e) => this.handleChange(e, 'optionOne')}
            type="input"
            placeholder="Enter option one"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Second Option</Form.Label>
          <Form.Control
            value={optionTwo}
            onChange={(e) => this.handleChange(e, 'optionTwo')}
            type="input"
            placeholder="Enter option two"
          />
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default connect()(AddQuestionPage);
