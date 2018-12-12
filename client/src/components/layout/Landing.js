import React, { Component } from 'react';

//get the auth state
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className='jumbotron'>
        <h1 className='display-4'>Welcome to the database lab</h1>
        <p className='lead'>
          This site will help you interact with the teacher and the assistants.
        </p>
        <p>Please use it regularly</p>
        <hr className='my-4' />
        <p>thanks</p>
        <p className='lead' />
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
