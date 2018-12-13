import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchStats } from '../../actions/statsActions';
import { Button } from 'reactstrap';

class StatsPage extends Component {
  onClick = () => {
    this.props.fetchStats();
  };

  render() {
    const { logins, requests } = this.props.stats;

    console.log(this.props.stats);

    return (
      <div>
        <Button onClick={this.onClick}>refresh</Button>

        <div className='jumbotron'>
          <h1 className='display-4'>Stats page</h1>
          <p className='lead'>so far, here's the stats for the lab</p>

          <h2>logins</h2>
          {logins}
          <h2>requests</h2>
          {requests}
          <hr className='my-4' />
          <p>thanks</p>
          <p className='lead' />
        </div>
      </div>
    );
  }
}

StatsPage.propTypes = {
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
)(StatsPage);
