import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

//https://reactjs.org/docs/conditional-rendering.html

import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

if (localStorage.jwtToken) {
  //set the auth header token
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //log the user out!
    store.dispatch(logoutUser);

    //TODO: clear the current profile

    //redirect to login page
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <div className='container'>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
