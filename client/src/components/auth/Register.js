import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';

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
      match: '',
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

    console.log('changing')
    if (event.target.name === 'password' || event.target.name === 'password2') {
      this.setState({errors: {}})

      //we need to check the opposite of whichever we currently have
      const opposite = event.target.name === 'password' ? this.state.password2 : this.state.password
      if ((event.target.value === opposite) && (event.target.value.length > 6)) {
        this.setState({match: 'Passwords verified'})
      } else {
        this.setState({match: ''})
      }
    }
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

    const classOptions = [
      { label: '111', value: '111' },
      { label: '225', value: '225' },
      { label: '325', value: '325' },
      { label: '425', value: '425' }
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
              <form onSubmit={this.onSubmit} style={{ top: '-20' }}>
                <TextFieldGroup
                  placeholder='first and last name'
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

                <SelectListGroup
                  name='className'
                  value={this.state.className}
                  error={errors.className}
                  onChange={this.onChange}
                  options={classOptions}
                  info='what class are you taking'
                />
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
                  match={this.state.match}
                />
                <input
                  type='submit'
                  className='btn btn-info btn-block mt-4'
                  style={{ marginBottom: '100px' }}
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
