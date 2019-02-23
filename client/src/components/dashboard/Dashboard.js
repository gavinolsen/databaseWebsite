import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

//THIS COMPOENT SHOULD HAVE TWO LINKS TO THE LISTS

class Dashboard extends Component {
  componentWillMount () {
    //console.log(this.props.auth.isAuthenticated);
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push ('/login');
    }
  }

  render () {
    const {user} = this.props.auth;

    return (
      <div className="jumbotron">
        <h1 className="display-4">Welcome {user.name}</h1>
        <p className="lead">
          This site will help you interact with the teacher and the assistants.
        </p>
        <Link className="nav-link nav-item" to="/makerequest">
          request help
        </Link>
        <hr className="my-4" />
        <p>
          thanks for being here, and let us know if there's anything we can do
        </p>
        <p className="lead" />

        {/* <div>
          just a little extra text for the website
          <p> Here's 10 tips to be successful in school and life. </p>
          <p> You may not think these are that important, but they are </p>
          <ul>
            <li>Work hard. It's more important than being smart.</li>
            <li>Make goals. If you have something you're pursing, you'll go farther.</li>
            <li>Be kind. You'll be surprised who ends up helping you out.</li>
            <li>Commit. Quiters don't get far in life.</li>
            <li>Be honest. Liars don't get far in life.</li>
            <li>Sleep well. You won't work as well when you're tired.</li>
            <li>Eat well. You won't work as well when you're hungry.</li>
            <li />
            <li />
            <li />
          </ul>
        </div> */}

      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect (mapStateToProps) (withRouter (Dashboard));
