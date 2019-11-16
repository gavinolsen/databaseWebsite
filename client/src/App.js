import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';

import {Provider} from 'react-redux';
import store from './store';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/common/PrivateRoute';

import NotFound from './components/not-found/NotFound';

//https://reactjs.org/docs/conditional-rendering.html

import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HowTo from './components/layout/HowTo';
import Landing from './components/layout/Landing';
import Dashboard from './components/dashboard/Dashboard';
import MakeRequest from './components/requests/MakeRequest';
import RequestList from './components/requests/RequestList';
import RequestList225 from './components/requests/RequestList225';
import RequestList325 from './components/requests/RequestList325';
import StatsPage from './components/stats/StatsPage';
import Stats225 from './components/stats/Stats225';
import Stats325 from './components/stats/Stats325';
import Admins from './components/auth/roles/Admins';

console.log('what is the token?');
console.log(localStorage.getItem('jwtToken'));

if (localStorage.getItem('jwtToken') !== null) {
  //set the auth header token
  setAuthToken (localStorage.jwtToken);
  //decode token and get user info
  const decoded = jwt_decode (localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch (setCurrentUser (decoded));

  //check for expired token
  const currentTime = Date.now () / 1000;
  if (decoded.exp < currentTime) {
    //log the user out!

    store.dispatch (logoutUser ());
    //redirect to login page
    window.location.href = '/login';
  }
}

class App extends Component {
  componentWillUnmount () {
    this.mounted = false;
  }

  render () {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/makerequest"
                  component={MakeRequest}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/roles"
                  component={Admins}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/howto"
                  component={HowTo}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/requestlist"
                  component={RequestList}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/requestlist225"
                  component={RequestList225}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/requestlist325"
                  component={RequestList325}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/stats" component={StatsPage} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/stats225" component={Stats225} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/stats325" component={Stats325} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
