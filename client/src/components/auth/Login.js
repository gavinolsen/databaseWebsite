import React, { Component } from 'react';

class Login extends Component {
  //set the state
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  //using arrow functions allows us
  //to not have to bind in the constructor
  //with
  //this.onChange = this.onChange.bing(this);
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(user);
  };

  render() {
    return (
      <div className='login'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Log In</h1>
              <p className='lead text-center'>
                Sign in to your database help account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='email'
                    className='form-control form-control-lg'
                    placeholder='Email Address'
                    name='email'
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className='form-control form-control-lg'
                    placeholder='Password'
                    name='password'
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input type='submit' className='btn btn-info btn-block mt-4' />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
