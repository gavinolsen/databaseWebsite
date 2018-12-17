import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStats225, fetchStats } from '../../actions/statsActions';
import { Link } from 'react-router-dom';
import { Button, Table } from 'reactstrap';

class Stats225 extends Component {
  componentDidMount() {
    //we will want to uncomment this before
    //releasing. but for testing it's annoying
    //if (!this.props.auth.isAdmin) {
    //  this.props.history.push('/dashboard');
    //}
  }

  componentWillMount() {
    this.props.fetchStats();
    this.props.getStats225();
  }

  onClick = () => {
    this.props.getStats225();
  };

  render() {
    //const { logins, requests } = this.props.stats;

    const { stats225 } = this.props.stats;
    //I now have an array of labs in stats225

    const stats = stats225.map((lab, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{lab.tue}</td>
        <td>{lab.thu}</td>
        <td>{lab.sat}</td>
        <td>{lab.tue + lab.thu + lab.sat}</td>
      </tr>
    ));

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
        </div>

        {/* I want to make a table, that is color coordinated based on the
            colors from true and disabled
            https://react-bootstrap.github.io/components/list-group/#listgroup-styling-state
            or colors, just below that ref.

            and I wanna wrap that in a table, so that it's easy to read
            https://react-bootstrap.github.io/components/table/
        */}

        <h2 className='info' style={{ marginLeft: '300px' }}>
          # of requests
        </h2>

        <Table
          striped
          bordered
          condensed='true'
          hover
          style={{ marginBottom: '150px' }}
        >
          <thead>
            <tr>
              <th>Lab #</th>
              <th>Tuesday</th>
              <th>Thursday</th>
              <th>Saturday</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>{stats}</tbody>
        </Table>
      </div>
    );
  }
}

Stats225.propTypes = {
  fetchStats: PropTypes.func.isRequired,
  getStats225: PropTypes.func.isRequired,
  stats: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  stats: state.stats,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getStats225, fetchStats }
)(Stats225);