import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLike, deletePost, removeLike } from '../../actions/postActions';

const PostItem = ({
  post,
  auth,
  addLike,
  removeLike,
  deletePost,
  showActions,
}) => {
  const handleDelete = (id) => {
    // Redux action
    deletePost(id);
  };

  const handleLike = (id) => {
    // Redux action
    addLike(id);
  };

  const handleUnlike = (id) => {
    // Redux action
    removeLike(id);
  };

  const findUserLike = (likes) => {
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className='card card-body mb-3'>
      <div className='row'>
        <div className='col-md-2'>
          <a href='profile.html'>
            <img
              className='rounded-circle d-none d-md-block'
              src={post.avatar}
              alt='Post Author'
            />
          </a>
          <br />
          <p className='text-center'>{post.name}</p>
        </div>
        <div className='col-md-10'>
          <p className='lead'>{post.text}</p>
          {showActions ? (
            <span>
              <button
                onClick={() => handleLike(post._id)}
                type='button'
                className='btn btn-light mr-1'
              >
                <i
                  className={
                    findUserLike(post.likes)
                      ? 'text-info fas fa-thumbs-up'
                      : 'fas fa-thumbs-up'
                  }
                ></i>
                <span className='badge alert-light'>{post.likes.length}</span>
              </button>
              <button
                onClick={() => handleUnlike(post._id)}
                type='button'
                className='btn btn-light mr-1'
              >
                <i className='text-secondary fas fa-thumbs-down'></i>
              </button>
              <Link to={`/post/${post._id}`} className='btn btn-info ms-1'>
                Comments
              </Link>
              {post.user === auth.user.id ? (
                <button
                  onClick={() => handleDelete(post._id)}
                  type='button'
                  className='btn btn-danger ms-1'
                >
                  <i className='fas fa-times' />
                </button>
              ) : null}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
