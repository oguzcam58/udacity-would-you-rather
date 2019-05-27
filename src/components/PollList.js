import React, { Component } from 'react';
import { connect } from 'react-redux';

class PollList extends Component {
  render() {
    const { title, pollData } = this.props;
    return (
      <div>
        <h3>{title}</h3>
        {pollData.map((item) => {
          return (
          <div key={item}>
            {item}
          </div>)
        })}
      </div>
    );
  }
}

export default PollList;
