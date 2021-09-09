import axios from 'axios';
import {
  ADD_POST,
  CLEAR_ERRORS,
  DELETE_POST,
  GET_ERRORS,
  GET_POST,
  GET_POSTS,
  POST_LOADING,
} from './types';

// Add post
const addPost = (postData) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post('/api/posts', postData)
    .then((res) =>
      dispatch({
        type: ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Get posts
const getPosts = () => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get('/api/posts')
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS,
        payload: null,
      })
    );
};

// Get single post
const getPost = (id) => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POST,
        payload: null,
      })
    );
};

// Delete post
const deletePost = (id) => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .delete(`/api/posts/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_POST,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS,
        payload: null,
      })
    );
};

// Add like
const addLike = (id) => (dispatch) => {
  axios
    .post(`/api/posts/like/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Remove like
const removeLike = (id) => (dispatch) => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Add comment
const addComment = (postId, commentData) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//  Delete comment
const deleteComment = (postId, comntId) => (dispatch) => {
  axios
    .delete(`/api/posts/comment/${postId}/${comntId}`)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set loading state
const setPostLoading = () => {
  return {
    type: POST_LOADING,
  };
};

// Clear errors
const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export {
  addPost,
  getPosts,
  getPost,
  addLike,
  removeLike,
  deletePost,
  addComment,
  deleteComment,
  setPostLoading,
  clearErrors,
};
