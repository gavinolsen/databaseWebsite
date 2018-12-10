import React, { Component } from 'react';
import axios from 'axios';
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    //I still need to add the className in here!
    //I won't be able to add a new user till I
    //check the requirements

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      className: this.state.className,
      password: this.state.password,
      password2: this.state.password2
    };

    axios
      .post('/api/users/register', newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
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

export default Register;
