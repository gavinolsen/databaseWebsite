import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//THIS COMPOENT SHOULD HAVE TWO LINKS TO THE LISTS

class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;

    return (
      <div className='jumbotron'>
        <h1 className='display-4'>Welcome {user.name}</h1>
        <p className='lead'>
          This site will help you interact with the teacher and the assistants.
        </p>
        <p>Please use it regularly</p>
        <Link className='nav-link' to='/makerequest'>
          request help
        </Link>
        <hr className='my-4' />
        <p>thanks</p>
        <p className='lead' />
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
