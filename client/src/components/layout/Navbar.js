import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//access the auth states
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.auth.user);
  }

  render() {
    //if they are admin, we should render the stats page.
    //otherwise, don't.
    const { isAuthenticated, user, isAdmin, className } = this.props.auth;

    const userName = user.name;

    const adminLinks = (
      <li className='nav-item nav-link'>
        <Link
          to='/stats'
          style={{
            color: 'gray',
            fontSizeAdjust: '-moz-initial',
            fontSize: '30px'
          }}
        >
          stats
        </Link>
      </li>
    );

    //console.log(user);
    //add
    const authLinks = (
      <ul className='navbar-nav ml-auto'>
        <li
          className='nav-item nav-link'
          style={{
            color: 'gray',
            fontSizeAdjust: '-moz-initial',
            fontSize: '30px'
          }}
        >
          {userName}-{className}
        </li>
        {isAdmin ? adminLinks : null}
        <li className='nav-item nav-link'>
          <Link
            to='/makerequest'
            style={{
              color: 'gray',
              fontSizeAdjust: '-moz-initial',
              fontSize: '30px'
            }}
          >
            help
          </Link>
        </li>
        <li className='nav-item nav-link'>
          <Link
            to='/requestlist'
            style={{
              color: 'gray',
              fontSizeAdjust: '-moz-initial',
              fontSize: '30px'
            }}
          >
            lists
          </Link>
        </li>
        <li className='nav-item'>
          <a
            href='/'
            onClick={this.onLogoutClick.bind(this)}
            className='nav-link'
          >
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/register'>
            Sign Up
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/login'>
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
        <div className='container'>
          <Link className='navbar-brand' to='/dashboard'>
            hello database
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#mobile-nav'
          >
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse' id='mobile-nav'>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
