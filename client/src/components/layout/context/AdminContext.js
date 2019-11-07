import React, { Component } from 'react';
import contextImage from './contextMenuWhite.jpg';
import CustomToggle from './CustomToggle';
import CustomMenu from './CustomMenu';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../../actions/authActions';

//auth
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AdminContext extends Component {

  //TODO - logout
  onLogoutClick() {
    console.log('logout')
  }

  render() {
    return (
      <Dropdown alignRight>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          <img src={contextImage} />
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenu}>
          <Dropdown.Item>
            <Link
              to="/roles"
              style={{
                color: 'gray',
                fontSizeAdjust: '-moz-initial',
                fontSize: '30px',
              }}
            >
              Roles
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link
              to="/requesthelp"
              style={{
                color: 'gray',
                fontSize: '30px',
              }}
            >
              Help
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link
              to="/howto"
              style={{
                color: 'gray',
                fontSize: '30px',
              }}
            >
              How to
            </Link>
          </Dropdown.Item>
          <Dropdown.Item onSelect={this.onLogoutClick}>
            <Link
              to="/login"
              style={{
                color: 'gray',
                fontSize: '30px',
              }}
            >
              Logout
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

AdminContext.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(AdminContext);