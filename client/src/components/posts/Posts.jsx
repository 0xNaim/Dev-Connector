import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';

const Posts = ({ getPosts, post }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const { posts, loading } = post;
  let postContent;

  if (posts === null || loading) {
    postContent = <Spinner />
  } else {
    postContent = <PostFeed posts={posts} />
  }


  return (
    <div className='feed'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <PostForm />
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
