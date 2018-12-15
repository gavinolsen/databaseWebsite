import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../common/Spinner';
import Requests from './Requests';

//I'll have to connect this to the request reducer!!!
//hook it up
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRequests, deleteRequest } from '../../actions/requestActions';

class RequestList extends Component {
  componentDidMount() {
    this.props.fetchRequests();
  }

  onDeleteClick = id => {
    console.log(id);
    this.props.deleteRequest(id);
  };

  render() {
    const { user, isAdmin } = this.props.auth;
    const { requests } = this.props.requests;

    let buttonContent;

    //here I can check for the loading property!
    //check if requests are equal to null, and
    //if they are just

    //moment().format('MMMM Do YYYY, h:mm:ss a');
    //the last part will give us the part we want!!!

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

    let requestListContent;

    if (requests === null) {
      requestListContent = <Spinner />;
    } else if (requests) {
      if (Object.keys(requests).length > 0) {
        requestListContent = (
          <div className='request-list'>
            <Container>
              <ListGroup>
                <TransitionGroup className='request-list'>
                  {requests.map(({ _id, className, userInfo }) => (
                    <CSSTransition key={_id} timeout={500} classNames='fade'>
                      <ListGroupItem className='request-box'>
                        {userInfo.name}{' '}
                        <small
                          style={{
                            float: '',
                            marginBottom: '5px',
                            right: '20'
                          }}
                        >
                          {' '}
                          {className}{' '}
                        </small>
                        {determineButton(userInfo._id, _id)
                          ? buttonContent
                          : ''}
                      </ListGroupItem>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </ListGroup>
            </Container>
          </div>
        );
      } else {
        //htere aren't any requests,
        //prompt the user to make one
      }
    }

    return (
      <div className='request-list'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='display-4'>Requests</h1>
              {requestListContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//I'll have to add a function here
//that gets the requests,
//but the function to make a request
//will come from the modal I'll make
RequestList.propTypes = {
  fetchRequests: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired,
  requests: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  requests: state.requests,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fetchRequests, deleteRequest }
)(RequestList);
