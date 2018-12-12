import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
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

    //it would be pretty cool to change

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
                <TextFieldGroup
                  placeholder='name'
                  name='name'
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder='email address'
                  name='email'
                  type='email'
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
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
                <TextFieldGroup
                  placeholder='password'
                  name='password'
                  type='password'
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder='password confirm'
                  name='password2'
                  type='password'
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
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
