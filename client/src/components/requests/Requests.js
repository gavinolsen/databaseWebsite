import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteRequest } from '../../actions/requestActions';

class Requests extends Component {
  onDeleteClick = id => {
    console.log(id);
    this.props.deleteRequest(id);
  };

  render() {
    const { user, isAdmin } = this.props.auth;

    let buttonContent;

    const determineButton = (request_user_id, request_id) => {
      if (user.id === request_user_id || isAdmin) {
        buttonContent = (
          <Button
            className='remove-btn'
            color='danger'
            size='sm'
            onClick={this.onDeleteClick.bind(this, request_id)}
            style={{
              float: 'right',
              marginTop: '0px',
              verticalAlign: 'middle'
            }}
          >
            &times;
          </Button>
        );
        return true;
      } else {
        return false;
      }
    };

    const requests = this.props.requests.map(request => (
      <tr key={request._id}>
        <td>{request.userInfo.name}</td>
        <td>{request.className}</td>
        <td>
          {determineButton(request.userInfo._id, _id) ? buttonContent : ''}
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className='mb-4'>Education Credentials</h4>
        <table className='table'>
          <thead>
            <tr>
              <th>Student</th>
              <th>Class</th>
              <th />
            </tr>
            {requests}
          </thead>
        </table>
      </div>
    );
  }
}

Requests.propTypes = {
  deleteRequest: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteRequest }
)(Requests);
