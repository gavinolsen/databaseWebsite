import axios from 'axios';

//takes care of authorization for us
const setAuthToken = token => {
  if (token) {
    //apply to all the requests
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    //delete the auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
