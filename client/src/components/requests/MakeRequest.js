import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { makeRequest, fetchRequests } from '../../actions/requestActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';

class MakeRequest extends Component {
  constructor() {
    super();
    this.state = {
      labNumber: '1',
      comment: '',
      errors: {}
    };

    //necessary for the change of text.
    //otherwise, this.setState gives error
    //of cannot call setState of undefined
    //this.onChange = this.onChange.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    //I still need to add the className in here!
    //I won't be able to add a new user till I
    //check the requirements

    //it would be pretty cool to change

    const { user } = this.props.auth;

    const newUserInfo = {
      name: user.name,
      _id: user._id
    };

    //make the user
    const newRequest = {
      userInfo: newUserInfo,
      labNumber: this.state.labNumber,
      className: user.className,
      comment: this.state.comment
    };

    //I'm going to get a lot of these properties from this.props.auth!!!

    //make a request!!!

    //and use redux
    this.props.makeRequest(newRequest, this.props.history);
    this.props.fetchRequests(this.props.history);
  };

  render() {
    const { errors } = this.state;

    const labOptions = [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
      { label: '6', value: '6' },
      { label: '7', value: '7' },
      { label: '8', value: '8' },
      { label: '9', value: '9' },
      { label: '10', value: '10' },
      { label: '11', value: '11' },
      { label: '12', value: '12' },
      { label: '13', value: '13' },
      { label: '14', value: '14' }
    ];

    return (
      //<!-- Register -->
      <div className='register'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>register</h1>
              <p className='lead text-center'>
                Create your database help account
              </p>
              <form onSubmit={this.onSubmit}>
                <SelectListGroup
                  name='labNumber'
                  value={this.state.labNumber}
                  error={errors.labNumber}
                  onChange={this.onChange}
                  options={labOptions}
                  info='which lab number do you need help with'
                />

                <TextAreaFieldGroup
                  placeholder='describe as best as you can what you need help with'
                  name='comment'
                  value={this.state.comment}
                  onChange={this.onChange}
                  error={errors.comment}
                />
                <input
                  type='submit'
                  className='btn btn-info btn-block mt-4 submitBtn'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MakeRequest.propTypes = {
  makeRequest: PropTypes.func.isRequired,
  fetchRequests: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  requests: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  requests: state.requests,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { makeRequest, fetchRequests }
)(withRouter(MakeRequest));
