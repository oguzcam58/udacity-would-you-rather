import React, { Component } from 'react';
import { Navbar, Nav, Image, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { setAuthedUser } from '../actions/authedUser';

class TopNav extends Component {
  logout = () => {
    this.props.dispatch(setAuthedUser(null));
  }

  render() {
    const {avatarURL, name} = this.props.userLoggedIn;

    return (
      <Navbar bg="light" expand="md" style={{marginBottom: '20px'}}>
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <LinkContainer to="/" className="nav-link">
              <NavItem>Home</NavItem>
            </LinkContainer>
            <LinkContainer to="/add" className="nav-link">
              <NavItem>New Question</NavItem>
            </LinkContainer>
            <LinkContainer to="/leaderboard" className="nav-link">
              <NavItem>Leaderboard</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as:
            <Image src={avatarURL} roundedCircle width="50px" height="50px" style={{marginLeft: '10px', marginRight: '10px'}}/>
          </Navbar.Text>
          <Navbar.Text>
            {name}
          </Navbar.Text>
          <Nav.Link onClick={this.logout}>Logout</Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps({users, authedUser}) {
  return {
    userLoggedIn: users[authedUser],
  };
}

export default connect(mapStateToProps)(TopNav);
