import React, { Component } from 'react';
import Moment from 'react-moment';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteRequest,
  startHelpingRequest
} from '../../actions/requestActions';

/**
 * this class was created to be able to distinguish the
 * students currently being helped. It's not completely necessary
 * but there was so much code in Requests.js I thought it was
 * better to just split it all up
 */

class RequestRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: Date().now
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

  onDeleteClick = id => {
    //console.log(id);
    this.props.deleteRequest(id);
  };

  onHelpClick = id => {
    //console.log(id);
    this.props.startHelpingRequest(id);
  };

  tick() {
    //console.log('ticking');
    this.setState(prevState => ({
      currentTime: Date().now
    }));
  }

  render() {
    const { user, isAdmin } = this.props.auth;
    let request = this.props.request;

    let rowContent;
    let helpButtonContent;
    let deleteButtonContent;

    //-new Date(request.timeStartedHelp).getTime()

    const determineTimeContent = isBeingHelped => {
      if (!isBeingHelped) {
        return <Moment format='h:mm:ssa'>{request.date}</Moment>;
      } else {
        // let timeComponent = <Moment format='h:mm:ss a'>{this.state.currentTime}</Moment>;
        console.log('current time');
        console.log(this.state.currentTime);
        console.log('time of request');
        console.log(typeof new Date(request.timeStartedHelp).getTime());
        console.log(new Date(request.timeStartedHelp).getTime());

        var diff = Math.abs(
          new Date(request.timeStartedHelp).getTime() - Date.now()
        );
        var minutes = Math.floor(((diff % 86400000) % 3600000) / 60000);
        //var seconds = Math.floor(((diff % 86400000) % 3600000) / 3600000);

        return <h3>{minutes} min</h3>;
      }
    };

    helpButtonContent = request_id => (
      <Button
        variant='success'
        color='success'
        onClick={this.onHelpClick.bind(this, request_id)}
        style={{
          verticalAlign: 'middle'
        }}
      >
        help
      </Button>
    );

    const determineDeleteButton = (request_user_id, request_id) => {
      if (user.id === request_user_id || isAdmin) {
        deleteButtonContent = (
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

    if (request.isBeingHelped) {
      rowContent = (
        <tr key={request._id} style={{ backgroundColor: '#adff2f' }}>
          <td>{request.userInfo.name}</td>
          <td>
            {isAdmin && !request.isBeingHelped
              ? helpButtonContent(request._id)
              : null}
          </td>
          <td>{request.className}</td>
          <td>{request.comment}</td>
          <td>{determineTimeContent(request.isBeingHelped)}</td>
          <td>
            {determineDeleteButton(request.userInfo._id, request._id)
              ? deleteButtonContent
              : null}
          </td>
        </tr>
      );
    } else {
      rowContent = (
        <tr key={request._id}>
          <td>{request.userInfo.name}</td>
          <td>{isAdmin ? helpButtonContent(request._id) : null}</td>
          <td>{request.className}</td>
          <td>{request.comment}</td>
          <td>{determineTimeContent(request.isBeingHelped)}</td>
          <td>
            {determineDeleteButton(request.userInfo._id, request._id)
              ? deleteButtonContent
              : null}
          </td>
        </tr>
      );
    }
    return rowContent;
  }
}

RequestRow.propTypes = {
  deleteRequest: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteRequest, startHelpingRequest }
)(RequestRow);
