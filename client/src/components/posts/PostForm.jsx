import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

const PostForm = ({ auth, addPost, errors }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const { user } = auth;

    const newPost = {
      text,
      name: user.name,
      avatar: user.avatar,
    };

    // Redux action
    addPost(newPost);
    // Clear state
    setText('');
  };

  useEffect(() => {
    setError(errors);
  }, [errors]);

  return (
    <div className='post-form mb-3'>
      <div className='card card-info'>
        <div className='card-header bg-info text-white'>Say Somthing...</div>
        <div className='card-body'>
          <form>
            <div className='form-group'>
              <TextAreaFieldGroup
                placeholder='Create a post'
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

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addPost })(PostForm);
