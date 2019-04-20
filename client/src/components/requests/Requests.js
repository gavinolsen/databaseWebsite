import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteRequest,
  fetchRequests,
  startHelpingRequest
} from '../../actions/requestActions';
import RequestRow from './RequestRow';

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
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState(prevState => ({
      currentTime: new Date().now
    }));
  }

  onDeleteClick = id => {
    this.props.deleteRequest(id);
  };

  //obsolete
  onHelpClick = id => {
    console.log(id);
    this.props.startHelpingRequest(id);
  };

  onClick = () => {
    this.props.fetchRequests();
  };

  render() {
    const { isAdmin } = this.props.auth;

    //moment().format('MMMM Do YYYY, h:mm:ss a');
    //the last part will give us the part we want!!!

    const requests = this.props.requests.map(request => (
      <RequestRow key={request._id} request={request} />
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
              <th>{isAdmin ? 'Help' : null}</th>
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
  { fetchRequests, deleteRequest, startHelpingRequest }
)(withRouter(Requests));
