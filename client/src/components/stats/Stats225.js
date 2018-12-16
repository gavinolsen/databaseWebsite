import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchStats } from '../../actions/statsActions';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class Stats225 extends Component {
  componentDidMount() {
    if (!this.props.auth.isAdmin) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillMount() {
    this.props.fetchStats();
  }

  onClick = () => {
    this.props.fetchStats();
  };

  render() {
    const { logins, requests } = this.props.stats;

    return (
      <div>
        <div className='jumbotron'>
          <Link
            to='/stats'
            className='btn btn-success'
            style={{ marginTop: '-70px' }}
          >
            Main Stats
          </Link>
          <h1 className='display-4'>225 Stats</h1>

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

          <p className='lead'>so far, here's the stats for the 225 class</p>
          <Button onClick={this.onClick}>refresh</Button>
          <h2 style={{ marginTop: '50px' }}>logins</h2>
          <h3 style={{ marginLeft: '30px' }}>{logins}</h3>
          <h2>requests</h2>
          <h3 style={{ marginLeft: '30px' }}>{requests}</h3>
          <hr className='my-4' />
          <p>thanks</p>
          <p className='lead' />
        </div>
      </div>
    );
  }
}

Stats225.propTypes = {
  fetchStats: PropTypes.func.isRequired,
  stats: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  stats: state.stats,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fetchStats }
)(Stats225);
