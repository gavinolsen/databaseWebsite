import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteRequest, fetchRequests } from '../../actions/requestActions';

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date().now
    };
  }

  //make sure you take that interval out!
  //it causes a memory leak
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState(prevState => ({
      currentTime: new Date().now
    }));
  }

  onDeleteClick = id => {
    console.log(id);
    this.props.deleteRequest(id);
  };

  onClick = () => {
    this.props.fetchRequests();
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

    //moment().format('MMMM Do YYYY, h:mm:ss a');
    //the last part will give us the part we want!!!

    const requests = this.props.requests.map(request => (
      <tr key={request._id}>
        <td>{request.userInfo.name}</td>
        <td>{request.className}</td>
        <td>{request.comment}</td>
        <td>
          <Moment format='h:mm:ss a'>{request.date}</Moment>
        </td>
        <td>
          {determineButton(request.userInfo._id, request._id)
            ? buttonContent
            : null}
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className='mb-4'>
          <Moment format='MMM DD - h:mm:ss a'>{this.state.currentTime}</Moment>
        </h4>
        <h4 className='mb-4'>
          Currently waiting: {this.props.requests.length}{' '}
        </h4>
        <Button onClick={this.onClick} className='mb-4'>
          refresh
        </Button>
        <table className='table'>
          <thead>
            <tr>
              <th>Student</th>
              <th>Class</th>
              <th>Comment</th>
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
  { fetchRequests, deleteRequest }
)(Requests);
