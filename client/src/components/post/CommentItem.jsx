import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/postActions';

const CommentItem = ({ auth, comment, deleteComment, postId }) => {
  const handleDelete = (postId, comntId) => {
    // Redux action
    deleteComment(postId, comntId);
  };

  return (
    <div className='card card-body mb-3'>
      <div className='row'>
        <div className='col-md-2'>
          <a href='profile.html'>
            <img
              className='rounded-circle d-none d-md-block'
              src={comment.avatar}
              alt='Comment Author'
            />
          </a>
          <br />
          <p className='text-center'>{comment.name}</p>
        </div>
        <div className='col-md-10'>
          <p className='lead'>{comment.text}</p>
          {comment.user === auth.user.id ? (
            <button
              onClick={() => handleDelete(postId, comment._id)}
              type='button'
              className='btn btn-danger ms-1'
            >
              <i className='fas fa-times' />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
