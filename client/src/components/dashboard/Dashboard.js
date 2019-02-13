import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

//THIS COMPOENT SHOULD HAVE TWO LINKS TO THE LISTS

class Dashboard extends Component {
  componentWillMount() {
    //console.log(this.props.auth.isAuthenticated);
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { user } = this.props.auth;

    return (
      <div className='jumbotron'>
        <h1 className='display-4'>Welcome {user.name}</h1>
        <p className='lead'>
          This site will help you interact with the teacher and the assistants.
        </p>
        <Link className='nav-link nav-item' to='/makerequest'>
          request help
        </Link>
        <hr className='my-4' />
        <p>
          thanks for being here, and let us know if there's anything we can do
        </p>
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

export default connect(mapStateToProps)(withRouter(Dashboard));
