// External imports
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Internal imports
const Post = require('../../models/Post');
const validatePostInput = require('../../validation/post');

// @route    POST api/posts
// @desc     Create post
// @access   Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    try {
      // Check validation
      if (!isValid) {
        return res.status(400).send(errors);
      }

      const newPost = await new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
      });
      await newPost.save();
      res.status(200).send(newPost);
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  }
);

// @route    GET api/posts
// @desc     Get posts
// @access   Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    if (!posts) {
      return res.status(404).send({ error: 'There are no posts' });
    }
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// @route    GET api/posts/:id
// @desc     Get single post
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (!post) {
      return res.status(404).send({ error: 'Post not found' });
    }
    res.status(200).send(post);
  } catch (err) {
    res.status(404).send({ error: 'Post not found' });
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete post by id
// @access   Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      // Check the authorization for delete post
      if (post.user.toString() !== req.user.id) {
        return res
          .status(401)
          .send({ error: 'You are not authorized to delete this post' });
      }

      if (!post) {
        return res.status(404).send({ error: 'Post not found' });
      }

      await post.remove();
      res.status(200).send({ message: 'Post deleted successfully' });
    } catch (err) {
      res.status(404).send({ error: 'Post not found' });
    }
  }
);

// @route    POST api/posts/like/id
// @desc     Like post
// @access   Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).send({ error: 'Post not found' });
      }

      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res.status(400).send({ error: 'You already like this post' });
      }

      // Add user id to like array
      post.likes.unshift({ user: req.user.id });
      await post.save();
      res.status(200).send(post);
    } catch (err) {
      res.status(500).send({ error: 'Post not found' });
    }
  }
);

// @route    POST api/posts/unlike/:id
// @desc     Unlike post
// @access   Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).send({ error: 'Post not found' });
      }

      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res
          .status(400)
          .send({ error: 'You have not yet like this post' });
      }

      // Get remove index
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);

      // Splice out of array
      post.likes.splice(removeIndex, 1);

      // Save & return post
      await post.save();
      res.status(200).send(post);
    } catch (err) {
      res.status(404).send({ error: 'Post not found' });
    }
  }
);

// @route    POST api/posts/comment/:id
// @desc     Add comment to post
// @access   Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    try {
      // Check validation
      if (!isValid) {
        return res.status(400).send(errors);
      }

      const post = await Post.findById(req.params.id);

      if (!post) res.status(404).send({ error: 'Post not found' });

      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
      };

      // Add to comments array
      post.comments.unshift(newComment);

      // Save & return post
      await post.save();
      res.status(200).send(post);
    } catch (err) {
      res.status(500).send({ error: 'Post not found' });
    }
  }
);

// @route    Delete api/posts/comment/:postId/:comntId
// @desc     Remove comment from post
// @access   Private
router.delete(
  '/comment/:postId/:comntId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);

      // Check the authorization for delete comment
      const singleComment = post.comments.filter(
        (comment) => comment._id.toString() === req.params.comntId
      );

      if (singleComment[0].user.toString() !== req.user.id) {
        return res
          .status(401)
          .send({ error: 'Your are not authorized to delete this comment' });
      }

      // Check if comment exist
      if (
        post.comments.filter(
          (comment) => comment._id.toString() === req.params.comntId
        ).length === 0
      ) {
        return res.status(404).send({ error: 'Comment does not exist' });
      }

      // Get remove index
      const removeIndex = post.comments
        .map((comment) => comment._id.toString())
        .indexOf(req.params.comntId);

      // Splice comment out of array
      post.comments.splice(removeIndex, 1);

      // Save & return post
      await post.save();
      res.status(200).send(post);
    } catch (err) {
      res.status(404).send({ error: err.message });
    }
  }
);

module.exports = router;
