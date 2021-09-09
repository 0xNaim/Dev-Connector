import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

const CommentForm = ({ auth, addComment, postId, errors }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      text,
      name: auth.user.name,
      avatar: auth.user.avatar,
    };

    // Redux action
    addComment(postId, newComment);
    // Clear state
    setText('');
  };

  useEffect(() => {
    setError(errors);
  }, [errors]);

  return (
    <div className='post-form mb-3'>
      <div className='card card-info'>
        <div className='card-header bg-info text-white'>Make a comment...</div>
        <div className='card-body'>
          <form>
            <div className='form-group'>
              <TextAreaFieldGroup
                placeholder='Reply to post'
                name='text'
                value={text}
                onChange={(e) => setText(e.target.value)}
                error={error.text}
              />
            </div>
            <button
              onClick={handleSubmit}
              type='button'
              className='btn btn-info mt-3'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
