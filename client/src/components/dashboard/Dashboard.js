import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

//THIS COMPOENT SHOULD HAVE TWO LINKS TO THE LISTS

class Dashboard extends Component {
  componentWillMount() {
    //console.log(this.props.auth.isAuthenticated);
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { user } = this.props.auth;

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
          Hey I'm Gavin Olsen. My LinkedIn information is at the bottom of the
          page if you want to contact me.{' '}
        </p>
        <p>
          Make a PR if you want any changes implemented to this website! Here's
          the <a href="https://github.com/gavinolsen/databaseWebsite">
            github
          </a>. Clone it, make a new branch, implement changes, then push it
          upstream. After pushing it upstream, go to the github link and create
          a PR. I'll take a look at it, and approve it. It's a great opportunity
          to learn new skills and develop for an open source project. Something
          that employers look for on resumes are projects like this so get
          involved and ask me about it! If you have any questions about setting
          up the website on your own machine let me know and I'll help you out.
        </p>
        <p>
          You should also be aware that I've left this website intentionally
          suceptible to certain vulnerabilities, and it will be obvious what
          those are if you look around the code. I've really thought of this
          website as a playground, where not only I can learn, but you can learn
          as well if you're willing to work and search through the details. But
          please don't mess it up, for the sake of the class :)
        </p>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(Dashboard));
