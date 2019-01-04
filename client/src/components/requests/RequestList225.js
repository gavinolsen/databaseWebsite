import React, { Component } from 'react';
import Spinner from '../common/Spinner';
import Requests from './Requests';
import { Link } from 'react-router-dom';

//I'll have to connect this to the request reducer!!!
//hook it up
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRequests } from '../../actions/requestActions';

class RequestList225 extends Component {
  componentDidMount() {
    this.props.fetchRequests();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onDeleteClick = id => {
    console.log(id);
    this.props.deleteRequest(id);
  };

  render() {
    const { requests } = this.props.requests;

    //this just brings back the name of everyone
    const requests225 = requests.filter(request => request.className === '225');

    //here I can check for the loading property!
    //check if requests are equal to null, and
    //if they are just

    let requestListContent;

    if (requests225 === null) {
      requestListContent = <Spinner />;
    } else if (requests225) {
      if (Object.keys(requests225).length > 0) {
        requestListContent = <Requests requests={requests225} />;
      } else {
        //htere aren't any requests,
        //prompt the user to make one
        requestListContent = <Spinner />;
      }
    }

    return (
      <div className='request-list' style={{ marginBottom: '100px' }}>
        <div className='container'>
          <div className='row'>
            <h1 className='display-4 col-md-6'>
              <Link to='/requestlist' className='rounded btn-dark'>
                Requests
              </Link>
            </h1>
            <h1
              className='col-md-4'
              style={{ marginTop: '10px', marginLeft: '40px' }}
            >
              225 list
            </h1>
          </div>
          <div
            className='row'
            style={{ marginBottom: '20px', marginTop: '15px' }}
          >
            <Link to='/requestlist225'>
              <div
                className='col-md-14 btn btn-info'
                style={{ marginLeft: '40px' }}
              >
                <span style={{ color: 'black' }}> 225 </span>
              </div>
            </Link>

            <Link to='/requestlist325'>
              <div
                className='col-md-14 btn btn-info'
                style={{ marginLeft: '40px' }}
              >
                <span style={{ color: 'black' }}> 325 </span>
              </div>
            </Link>
          </div>
          <div className='row'>
            <div className='col-md-12'>{requestListContent}</div>
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
RequestList225.propTypes = {
  fetchRequests: PropTypes.func.isRequired,
  requests: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  requests: state.requests
});

export default connect(
  mapStateToProps,
  { fetchRequests }
)(RequestList225);
