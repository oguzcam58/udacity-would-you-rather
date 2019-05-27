import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import Nav from './Nav';
import HomePage from './HomePage';
import QuestionPage from './QuestionPage';
import AddQuestionPage from './AddQuestionPage';
import LoginPage from './LoginPage';
import LeaderboardPage from './LeaderboardPage';

class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData());
  }

  render () {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {this.props.userLoggedIn === true
            ? <div>
                <Nav />
                <Route path='/' exact component={HomePage} />
                <Route path='/add' component={AddQuestionPage} />
                <Route path='/leaderboard' component={LeaderboardPage} />
                <Route path='/questions/:id' component={QuestionPage} />
              </div>
            : <LoginPage />
          }
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    userLoggedIn: authedUser !== null,
  }
}

export default connect(mapStateToProps)(App);
