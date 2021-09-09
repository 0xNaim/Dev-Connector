import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { clearErrors } from './postActions';
import {
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  SET_CURRENT_USER,
} from './types';

// Create profile
const createProfile = (profileData, history) => (dispatch) => {
  dispatch(clearErrors());
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

// Add experience
const addExperience = (experienceData, history) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post('/api/profile/experience', experienceData)
    .then((res) => history.push('/dashboard'))
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Delete experience
const deleteExperience = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Add ecucation
const addEducation = (educationData, history) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post('/api/profile/education', educationData)
    .then((res) => history.push('/dashboard'))
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Delete education
const deleteEducation = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
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

// Get all profiles
const getProfiles = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then((res) =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILES,
        payload: null,
      })
    );
};

// Get profile by handle
const getProfileByHandle = (handle) => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: null,
      })
    );
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
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation,
  getProfiles,
  getProfileByHandle,
  deleteAccount,
};
