import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer
        className='bg-dark text-white mt-5 p-4 text-center'
        style={{
          color: '#a7a7a7',
          position: 'absolute',
          bottom: '0',
          right: '0',
          left: '0'
        }}
      >
        &copy;{' '}
        <a href='https://linkedin.com/in/gavin-olsen-74188813a/'>gnarlygav</a>
      </footer>
    );
  }
}
