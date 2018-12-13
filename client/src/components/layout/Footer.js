import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer className='bg-dark text-white mt-5 p-4 text-center'>
        &copy;{' '}
        <a
          href='https://linkedin.com/in/gavin-olsen-74188813a/'
          style={{ color: '#a7a7a7' }}
        >
          gnarlygav
        </a>
      </footer>
    );
  }
}
