import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

import classnames from 'classnames';

import '../../App.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      className: '',
      password: '',
      password2: '',
      errors: {}
    };

    //necessary for the change of text.
    //otherwise, this.setState gives error
    //of cannot call setState of undefined
    //this.onChange = this.onChange.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
  }

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

    //make the user
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      className: this.state.className ? this.state.className : '225',
      password: this.state.password,
      password2: this.state.password2
    };

    //and use redux
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

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
                <div className='form-group'>
                  <input
                    type='text'
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.name
                    })}
                    placeholder='Name'
                    name='name'
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className='invalid-feedback'>{errors.name}</div>
                  )}
                </div>
                <div className='form-group'>
                  <input
                    type='email'
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email
                    })}
                    placeholder='Email Address'
                    value={this.state.email}
                    name='email'
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className='invalid-feedback'>{errors.email} </div>
                  )}
                </div>
                <div className='lead text-center'>Class</div>
                <div className='form-group'>
                  <select
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.className
                    })}
                    value={this.state.className}
                    onChange={this.onChange}
                    name='className'
                  >
                    <option value='225'>225</option>
                    <option value='325'>325</option>
                  </select>
                  {errors.className && (
                    <div className='invalid-feedback'>{errors.className} </div>
                  )}
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                    })}
                    placeholder='Password'
                    name='password'
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className='invalid-feedback'>{errors.password} </div>
                  )}
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password2
                    })}
                    placeholder='Confirm Password'
                    name='password2'
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className='invalid-feedback'>{errors.password2} </div>
                  )}
                </div>
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

//most of what happens down here is
//to help out with axios. It connects the
//backend functions with the frontend!
//pretty cool stuff

//setup the props
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//setup the props from the state
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

//connect this react component
//with the redux actions
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
