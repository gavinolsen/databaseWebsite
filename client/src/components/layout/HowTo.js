import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//get the auth state
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class HowTo extends Component {
  render() {

    return (
      <div className="jumbotron">
        <h1 className="display-4">Welcome to the class!</h1>
        <p className="lead">
          This page is intended to give new students an introduction to the
          navigation and function of the website.
        </p>
        <ol>
          <li>
            <span style={{fontWeight: 'bold'}}>Navbar - Make Request </span>: Enter the lab number you're having
            trouble with, and a comment. You'll automatically be directed to the
            list after submitting a request, where you can see your name slowly
            but surely move up the list.
          </li>
          <li>
            <span style={{fontWeight: 'bold'}}>Context - Lists </span>: See where you're at in the queue! This is
            where you'll have to wait your turn. The page doesn't automatically
            refresh because of costs associated with contant data fetching, but
            you can click the refresh button at the center of the page.
          </li>
          <li>
            <span style={{fontWeight: 'bold'}}> Requests</span> : Click on one of the buttons below the `Requests`
            button to see requests for a certain class. This is where you can
            see where you at in the queue.
          </li>
        </ol>
        <Link
          to="/makerequest"
          style={{
            color: 'blue',
            fontSizeAdjust: '-moz-initial',
            fontSize: '18px',
          }}
        >
          Get started with your first request
        </Link>
      </div>
    );
  }
}

HowTo.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(HowTo);
