import React, { Component } from 'react';
import Spinner from '../../common/Spinner';
import AdminList from './AdminsList';
import { Button } from 'reactstrap';
//I'll have to connect this to the request reducer!!!
//hook it up
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../../common/TextFieldGroup';

import { changeAdminStatus } from '../../../actions/authActions';

class Admins extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      errors: {},
    };
  }

  componentWillMount() {
    const { auth } = this.props;

    if (!auth.isAdmin) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onDeleteClick = (id) => {
    console.log(id);
    this.props.deleteRequest(id);
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onClick = () => {
    const { email } = this.state;
    this.props.changeAdminStatus({email, isAdmin: true});
  };

  render() {
    //here I can check for the loading property!
    //check if requests are equal to null, and
    //if they are just

    const { errors } = this.state;

    const adminContent = <AdminList />;

    return (
      <div className="request-list" style={{ marginBottom: '100px' }}>
        <div className="container">
          <div className="row">
            <h1
              className="col-md-4"
              style={{ marginTop: '10px', marginLeft: '40px' }}
            >
              Admin list
            </h1>
            <p>Add a student to the admin list by entering their email in the text field, then selecting 'Add'</p>
          </div>
          <div>
            <table>
              <tr>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h3 style={{ marginRight: '50px', marginTop: '10px' }}>
                      Enter a students email:{' '}
                    </h3>
                    <TextFieldGroup
                      placeholder="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                    />
                    <Button
                      onClick={this.onClick.bind(this)}
                      className="btn btn-info"
                      style={{marginLeft: '20px', height:'2%'}}
                    >
                      Add
                    </Button>
                  </div>
                </td>
              </tr>
            </table>

            <div
              className="row"
              style={{ marginBottom: '20px', marginTop: '15px' }}
            />
            <div className="row">
              <div className="col-md-12">{adminContent}</div>
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
Admins.propTypes = {
  changeAdminStatus: PropTypes.func.isRequired,
  requests: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  requests: state.requests,
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { changeAdminStatus })(Admins);
