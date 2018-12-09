import React, { Component } from 'react';

class Landing extends Component {
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

export default Landing;
