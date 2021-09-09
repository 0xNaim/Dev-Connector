import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { clearErrors } from './postActions';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register user
const registerUser = (userData, history) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post('/api/users/register', userData)
    .then(() => history.push('/login'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - Get user token
const loginUser = (userData) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post('/api/users/login', userData)
    .then((res) => {
      // Get token
      const { token } = res.data;
      // Save the token on localStorage
      localStorage.setItem('jwtToken', token);
      // Set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set login user
const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Logout user
const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export { registerUser, loginUser, setCurrentUser, logoutUser };
