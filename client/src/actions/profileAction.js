import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  GET_PROFILE,
  PROFILE_LOADING,
  SET_CURRENT_USER,
} from './types';

// Get current profile
const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

// Create profile
const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post('/api/profile', profileData)
    .then((res) => history.push('/dashboard'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Delete account and profile
const deleteAccount = () => (dispatch) => {
  if (
    window.confirm("Are you sure to delete your account? It's can't be undone.")
  ) {
    axios
      .delete('/api/profile')
      .then((res) => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        });
        // Remove token from localStorage
        localStorage.removeItem('jwtToken');
        // Remove auth header for future requests
        setAuthToken(false);
      })
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};

// Profile loading
const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// Clear profile
const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

export {
  getCurrentProfile,
  setProfileLoading,
  clearCurrentProfile,
  createProfile,
  deleteAccount,
};
