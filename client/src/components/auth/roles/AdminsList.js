import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAdmins } from '../../../actions/authActions';
import RolesRow from './RolesRow';

class AdminsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date().now,
    };
  }

  componentWillMount() {
  }

  //make sure you take that interval out!
  //it causes a memory leak
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
    this.interval = setInterval(() => this.tick(), 1000);


    console.log('admins property');
    this.props.fetchAdmins();
  }

  tick() {
    this.setState((prevState) => ({
      currentTime: new Date().now,
    }));
  }

  onDeleteClick = (id) => {
    this.props.deleteRequest(id);
  };

  //obsolete
  onHelpClick = (id) => {
    console.log(id);
    this.props.startHelpingRequest(id);
  };

  onClick = () => {
    this.props.fetchRequests();
  };

  render() {
    const { admins } = this.props.auth;

    //moment().format('MMMM Do YYYY, h:mm:ss a');
    //the last part will give us the part we want!!!

    const adminsContent = admins
      ? admins.map((admin) => <RolesRow key={admin._id} admin={admin} />)
      : null;

    return (
      <div>
        <h4 className="mb-4">
          Current admin count: {admins ? admins.length : 0}{' '}
        </h4>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th />
            </tr>
            {adminsContent}
          </thead>
        </table>
      </div>
    );
  }
}

AdminsList.propTypes = {
  fetchAdmins: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { fetchAdmins })(
  withRouter(AdminsList)
);
