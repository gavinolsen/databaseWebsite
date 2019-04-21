import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchStats, getLoggedInUsers } from '../../actions/statsActions';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import SemesterTerm from './SemesterTerm';

class StatsPage extends Component {

  componentWillMount() {
    this.props.fetchStats();
    this.props.getLoggedInUsers();
  }

  onClick = () => {
    this.props.fetchStats();
    this.props.getLoggedInUsers();
  };

  render() {
    const { logins, requests, loggedInUsers } = this.props.stats;

    return (
      <div>
        <div className='jumbotron'>
          <h1 className='display-4'>Stats page</h1>

          <div
            className='row'
            style={{ marginBottom: '20px', marginTop: '15px' }}
          >
            <Link to='/stats225'>
              <div
                className='col-md-14 btn btn-info'
                style={{ marginLeft: '40px' }}
              >
                <span style={{ color: 'black' }}> 225 stats </span>
              </div>
            </Link>

            <Link to='/stats325'>
              <div
                className='col-md-14 btn btn-info'
                style={{ marginLeft: '40px' }}
              >
                <span style={{ color: 'black' }}> 325 stats </span>
              </div>
            </Link>
          </div>

          <p className='lead'>so far, here's the stats for the lab</p>
          <Button onClick={this.onClick}>refresh</Button>

          <h1>current users</h1>
          <h2>{loggedInUsers}</h2>

          <h2 style={{ marginTop: '50px' }}>logins</h2>
          <h3 style={{ marginLeft: '30px' }}>{logins}</h3>
          <h2>requests</h2>
          <h3 style={{ marginLeft: '30px' }}>{requests}</h3>
          <hr className='my-4' />

          <SemesterTerm />

          <p className='lead' />
        </div>
      </div>
    );
  }
}

StatsPage.propTypes = {
  fetchStats: PropTypes.func.isRequired,
  getLoggedInUsers: PropTypes.func.isRequired,
  stats: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  stats: state.stats,
  auth: state.auth,
  terms: state.terms
});

export default connect(
  mapStateToProps,
  { fetchStats, getLoggedInUsers }
)(StatsPage);
