import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchStats, getStats325 } from '../../actions/statsActions';
import { Link } from 'react-router-dom';
import { Button, Table } from 'reactstrap';

import getDay from 'date-fns/get_day';

class Stats325 extends Component {
  componentDidMount() {
    //if (!this.props.auth.isAdmin) {
    //  this.props.history.push('/dashboard');
    // }
  }

  componentWillMount() {
    this.props.fetchStats();
    this.props.getStats325();
  }

  onClick = () => {
    this.props.fetchStats();
  };

  organizeStats = stats325 => {
    const daysByLab = [
      { tue: 0, thu: 0, sat: 0 }, //lab1
      { tue: 0, thu: 0, sat: 0 },
      { tue: 0, thu: 0, sat: 0 },
      { tue: 0, thu: 0, sat: 0 },
      { tue: 0, thu: 0, sat: 0 },
      { tue: 0, thu: 0, sat: 0 },
      { tue: 0, thu: 0, sat: 0 },
      { tue: 0, thu: 0, sat: 0 },
      { tue: 0, thu: 0, sat: 0 },
      { tue: 0, thu: 0, sat: 0 },
      { tue: 0, thu: 0, sat: 0 },
      { tue: 0, thu: 0, sat: 0 },
      { tue: 0, thu: 0, sat: 0 },
      { tue: 0, thu: 0, sat: 0 } //lab14
    ];

    var i;
    var j;
    for (i = 0; i < stats325.length; i++) {
      for (j = 0; j < stats325[i].requests.length; j++) {
        switch (getDay(stats325[i].requests[j].date)) {
          case 2:
            daysByLab[i].tue = daysByLab[i].tue + 1;
            break;
          case 4:
            daysByLab[i].thu = daysByLab[i].thu + 1;
            break;
          case 6:
            daysByLab[i].sat = daysByLab[i].sat + 1;
            break;
          default:
            break;
        }
      }
    }

    // console.log('leaving function with: ');
    // console.log(daysByLab);

    return daysByLab;
  };

  render() {
    //const { logins, requests } = this.props.stats;

    const { stats325 } = this.props.stats;
    //I now have an array of labs in stats325

    // console.log('logging from Stats325.js');
    // console.log(stats325);

    // if (stats325[3]) {
    //   console.log('should be saturday!')
    //   console.log(getDay(stats325[3].requests[0].date))
    // }

    const newStats = this.organizeStats(stats325);

    // console.log('here are the returned stats');
    // console.log(newStats);

    const stats = newStats.map((lab, index) => (
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
          <h1 className='display-4'>325 Stats</h1>

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

Stats325.propTypes = {
  fetchStats: PropTypes.func.isRequired,
  getStats325: PropTypes.func.isRequired,
  stats: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  stats: state.stats,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fetchStats, getStats325 }
)(Stats325);
