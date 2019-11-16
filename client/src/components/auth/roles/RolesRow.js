import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeAdminStatus } from '../../../actions/authActions';

/**
 * this class was created to be able to distinguish the
 * students currently being helped. It's not completely necessary
 * but there was so much code in Requests.js I thought it was
 * better to just split it all up
 */

class RolesRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: Date().now,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  //make sure you take that interval out!
  //it causes a memory leak
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onDeleteClick = (email) => {
    this.props.changeAdminStatus({ email, isAdmin: false });
  };

  onHelpClick = (id) => {
    this.props.startHelpingRequest(id);
  };

  tick() {
    this.setState((prevState) => ({
      currentTime: Date().now,
    }));
  }

  render() {
    let admin = this.props.admin;
    let rowContent;
    const deleteButtonContent = (
      <Button
        className="remove-btn"
        color="danger"
        size="sm"
        onClick={this.onDeleteClick.bind(
          this,
          admin ? admin.email || 'no email' : null
        )}
        style={{
          float: 'right',
          marginTop: '0px',
          verticalAlign: 'middle',
        }}
      >
        &times;
      </Button>
    );

    rowContent = (
      <tr key={admin ? admin._id : 0}>
        <td>{admin ? admin.name : 'no admin given'}</td>
        <td>{admin ? admin.email : 'no email'}</td>
        <td>{deleteButtonContent}</td>
      </tr>
    );

    return rowContent;
  }
}

RolesRow.propTypes = {
  changeAdminStatus: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { changeAdminStatus })(RolesRow);
