import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table , Image } from 'react-bootstrap';

class LeaderboardPage extends Component {
  render() {
    const { users, userIdsSorted } = this.props;

    return (
      <Fragment>
        <h3>Leaderboard</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {userIdsSorted.map((userId, index) => {
              const user = users[userId];
              return (
                <tr key={userId}>
                  <td>{index + 1}</td>
                  <td>
                    <Image src={user.avatarURL}
                      roundedCircle
                      width="50px"
                      height="50px"
                      style={{ marginRight: '10px' }} />
                    {user.name}
                  </td>
                  <td>{getScore(user)}</td>
                </tr>
              );
              })}
          </tbody>
        </Table>
      </Fragment>
    );
  }
}

const getScore = (user) => {
  return user.questions.length + Object.keys(user.answers).length;
}

function mapStateToProps({ users }) {
  return {
    users,
    userIdsSorted: Object.keys(users)
      .sort((a, b) => getScore(users[b]) - getScore(users[a])),
  }
}

export default connect(mapStateToProps)(LeaderboardPage);
