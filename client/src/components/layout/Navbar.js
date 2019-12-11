import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StudentContext from './context/StudentContext';
import AdminContext from './context/AdminContext';

//access the auth states
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.auth.user);
  }

  contextClick(e) {
    e.preventDefault();
    console.log('context clicked');
  }

  render() {
    //if they are admin, we should render the stats page.
    //otherwise, don't.
    const { isAuthenticated, user, isAdmin, className } = this.props.auth;

    const studentContext = (
      <ul className="navbar-nav ml-auto">
        <li style={{marginRight: '30px', marginTop: '5px'}}>
          <Link
            to="/makerequest"
            style={{
              color: 'white',
              fontSizeAdjust: '-moz-initial',
              fontSize: '30px',
            }}
          >
            Make Request
          </Link>
        </li>
        <li>
          <StudentContext />
        </li>
      </ul>
    );

    const adminContext = (
      <ul className="navbar-nav ml-auto">
        <li style={{marginRight: '30px', marginTop: '5px'}}>
          <Link
            to="/requestlist"
            style={{
              color: 'white',
              fontSizeAdjust: '-moz-initial',
              fontSize: '30px',
            }}
          >
            Request list
          </Link>
        </li>
        <li>
          <AdminContext />
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/dashboard">
            Home
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="nav-link nav-item navbar-nav"
            style={{ float: 'right' }}
          >
            {!isAuthenticated ? guestLinks : isAdmin ? adminContext : studentContext}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
