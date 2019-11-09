import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//get the auth state
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class HowTo extends Component {
  render() {
    const threeTabs = <span>&nbsp;&nbsp;&nbsp;</span>;
    const sixTabs = <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>;

    return (
      <div className="jumbotron">
        <h1 className="display-4">Welcome to the class!</h1>
        <p className="lead">
          This page is intended to give newcommers an introduction to navigation
          and function of the website.
        </p>
        <ul>
          <li>
            <h2>1 - Navbar buttons</h2>
          </li>
          <ul>
            <li>
              <h3>
                {' '}
                a. Help - Enter the lab number you're having trouble with, and a
                comment. You'll automatically be directed to the list after
                submitting a request, where you can see your name slowly but
                surely move up the list
              </h3>
            </li>
            <li>
              <h3> b. Context menu - </h3>
            </li>
            <ul>
              <li>
                <h4>
                  i. Lists - See where you're at in the queue! This is where
                  you'll have to wait your turn. The page doesn't automatically
                  refresh because of costs associated with contant data
                  fetching, but you can click the refresh button at the center
                  of the page
                </h4>
              </li>
              <li>
                <h4> ii. Logout - Leave the website </h4>
              </li>
            </ul>
          </ul>
          <li>
            <h2>2 - Lists</h2>
          </li>
          <ul>
            <li>
              <h3>
                {threeTabs} a. Requests - This is a combined list for CIT 225
                and CIT 325. chances are, you won't want to look at the general
                list. Click on one of the buttons below the `Requests` button to
                see requests for a certain class
              </h3>
            </li>
            <li>
              <h3>{threeTabs} b. 225 - for CIT 225</h3>
            </li>
            <li>
              <h3>{threeTabs} c. 325 - for CIT 325</h3>
            </li>
          </ul>
        </ul>

        <Link
          to="/makerequest"
          style={{
            color: 'blue',
            fontSizeAdjust: '-moz-initial',
            fontSize: '30px',
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
