import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost } from '../../actions/postActions';
import Spinner from '../common/Spinner';
import PostItem from '../posts/PostItem';
import CommentFeed from './CommentFeed';
import CommentForm from './CommentForm';

const Post = ({ getPost, match, post }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match]);


  let postContent;
  if (
    post.post === null ||
    post.loading ||
    Object.keys(post.post).length === 0
  ) {
    postContent = <Spinner />;
  } else {
    postContent = (
      <div>
        <PostItem post={post.post} showActions={false} />
        <CommentForm postId={post.post._id} />
        <CommentFeed postId={post.post._id} comments={post.post.comments} />
      </div>
    );
  }

  return (
    <div className='post'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <Link to='/feed' className='btn btn-light mb-3'>
              &larr; Back To Feed
            </Link>
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
