import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

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

    // dispatch new question

    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome: true,
    }));
  }

  render() {
    const { optionOne, optionTwo, toHome } = this.state;

    if (toHome === true) {
      return (<Redirect to='/' />);
    }

    return (
      <div>
        <h3>Create New Question</h3>
        <form onSubmit={this.handleSubmit}>
          <strong>Would you rather ...</strong>

          <br />

          <input
            type="text"
            placeholder="Enter Option One Text Here"
            value={optionOne}
            onChange={(e) => this.handleChange(e, "optionOne")}
          />

          <hr />

          <input
            type="text"
            placeholder="Enter Option Two Text Here"
            value={optionTwo}
            onChange={(e) => this.handleChange(e, "optionTwo")}
          />

          <br />

          <button
            className='btn'
            type='submit'
            disabled={optionOne === '' || optionTwo === ''}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AddQuestionPage;
