// External imports
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Internal imports
const User = require('../../models/User');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route    POST api/users/register
// @desc     Register user
// @access   Public
router.post('/register', async (req, res) => {
  const avatar = gravatar.url(req.body.email, {
    s: '200', // Size
    r: 'pg', // Rating
    d: 'mm', // Default
  });
  const { errors, isValid } = validateRegisterInput(req.body);

  try {
    // Check validation
    if (!isValid) {
      return res.status(400).send(errors);
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      errors.email = 'Email already exists!';
      return res.status(400).send({ errors });
    }

    const newUser = await new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        await newUser.save();
        res.status(201).send(newUser);
      });
    });
  } catch (err) {
    res.status(500).send({ error: 'Something went wrong! Please try again.' });
  }
});

// @route    POST api/users/login
// @desc     Login user / retuning jwt token
// @access   Public
router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  const email = req.body.email;
  const password = req.body.password;

  try {
    // Check validation
    if (!isValid) {
      return res.status(400).send(errors);
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check for user
    if (!user) {
      errors.email = 'Unable to login';
      return res.status(401).send({ errors });
    }

    // Check password
    const passIsMatch = await bcrypt.compare(password, user.password);

    if (!passIsMatch) {
      errors.password = 'Password incorrect';
      return res.status(400).send(errors);
    }

    // Create jwt payload
    const payload = { id: user.id, name: user.name, avatar: user.avatar };

    // JWT token generate
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    res
      .status(200)
      .send({ message: 'Login success!', token: `Bearer ${token}` });
  } catch (err) {
    res.status(500).send({ error: 'Something went wrong! Please try again.' });
  }
});

// @route    GET api/users/current
// @desc     Return current user
// @access   Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.status(200).send({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
    });
  }
);

module.exports = router;
