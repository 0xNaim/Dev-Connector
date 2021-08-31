// External imports
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Internal imports
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
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

// @route    GET api/posts/:post_id
// @desc     Get single post
// @access   Public
router.get('/:post_id', async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.post_id });
    if (!post) {
      return res.status(404).send({ error: 'Post not found' });
    }
    res.status(200).send(post);
  } catch (err) {
    res.status(404).send({ error: 'Post not found' });
  }
});

// @route    DELETE api/posts/:post_id
// @desc     Delete post by id
// @access   Private
router.delete(
  '/:post_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.post_id);

      if (post.user.toString() !== req.user.id) {
        return res
          .status(401)
          .send({ error: 'User are not authorized to delete this post' });
      }

      if (!post) {
        return res.status(404).send({ error: 'Post not found' });
      }

      await post.remove();
      res.status(200).send({ message: 'Post deleted successfully' });

      // Post.findById(req.params.post_id)
      //   .then((post) => {
      //     // Check the author
      //     if (post.user !== req.user.id) {
      //       return res
      //         .status(401)
      //         .send({ error: 'User are not authorized to delete this post' });
      //     }
      //     // Delete post
      //     post
      //       .remove()
      //       .then(() => {
      //         res.status(200).send({ message: 'Post deleted successfully' });
      //       })
      //       .catch(() => {
      //         res.status(500).send({ error: 'Can not delete post' });
      //       });
      //   })
      //   .catch((err) => {
      //     res.status(404).send({ error: 'Post not found' });
      //   });
    } catch (err) {
      res.status(404).send({ error: 'Post not found' });
    }
  }
);

module.exports = router;
