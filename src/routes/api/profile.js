// External imports
const express = require('express');
const passport = require('passport');

// Internal imports
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// Router initialize
const router = express.Router();

// @route    POST api/profile
// @desc     Create or edit user profile
// @access   Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).send(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubUsername)
      profileFields.githubUsername = req.body.githubUsername;

    // Skills - Split into an array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // Update
        const updatedProfile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        res.status(200).send(updatedProfile);
      } else {
        // Create

        // Check if handle exists
        const profile = await Profile.findOne({ handle: profileFields.handle });
        if (profile) {
          errors.handle = 'The handle is already exists!';
          return res.status(400).send(errors);
        }

        // Save profile
        const newProfile = await new Profile(profileFields).save();
        res.status(200).send(newProfile);
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);

// @route    GET api/profile
// @desc     Get current user profile
// @access   Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const errors = {};

    try {
      const profile = await Profile.findOne({ user: req.user.id }).populate(
        'user',
        ['name', 'avatar']
      );

      if (!profile) {
        errors.noprofile = 'There is no profile for this user!';
        return res.status(404).send(errors);
      }

      return res.status(200).send(profile);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);

// @route    GET api/profile/handle/:handle
// @desc     Get profile by handle
// @access   Public
router.get('/handle/:handle', async (req, res) => {
  const errors = {};
  try {
    const profile = await Profile.findOne({
      handle: req.params.handle,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      errors.noprofile = 'There is no profile for this user';
      return res.status(404).send(errors);
    }

    res.status(200).send(profile);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// @route    GET api/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {
  const errors = {};
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      errors.noprofile = 'There is no profile for this user';
      return res.status(404).send(errors);
    }

    res.status(200).send(profile);
  } catch (err) {
    res.status(500).send({ error: 'There is no profile for this user' });
  }
});

// @route    GET api/profile/all
// @desc     Get all profiles
// @access   Public
router.get('/all', async (req, res) => {
  try {
    const allProfile = await Profile.find({}).populate('user', [
      'name',
      'avatar',
    ]);
    if (!allProfile) {
      return res.status(404).send({ error: 'There are no profiles' });
    }
    res.status(200).send(allProfile);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

// @route    POST api/profile/experience
// @desc     Add experience to profile
// @access   Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).send(errors);
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        return res
          .status(404)
          .send({ error: 'There is no profile for this user!' });
      }

      const newExperience = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      // Add to experience array
      await profile.experience.unshift(newExperience);
      await profile.save();

      res.status(200).send(profile);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);

// @route    POST api/profile/education
// @desc     Add education to profile
// @access   Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).send(errors);
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        return res
          .status(404)
          .send({ error: 'There is no profile for this user!' });
      }

      const newEducation = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      // Add to experience array
      await profile.education.unshift(newEducation);
      await profile.save();

      res.status(200).send(profile);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);

// @route    DELETE api/profile/experience/exp_id
// @desc     Delete experience from profile
// @access   Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      const newExperience = await profile.experience.pull({
        _id: req.params.exp_id,
      });

      if (!newExperience) {
        return res.status(404).send({ error: 'Experience not found!' });
      }

      // Get remove index
      // const removeIndex = profile.experience
      //   .map((experience) => experience.id )
      //   .indexOf(req.params.exp_id);

      // Splice out the array
      // profile.experience.splice(removeIndex, 1);

      // Save
      await profile.save();
      res.status(200).send(profile);
    } catch (err) {
      res.status(404).send({ error: 'Experience not found!' });
    }
  }
);

// @route    DELETE api/profile/education/edu_id
// @desc     Delete education from profile
// @access   Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      const newEducation = await profile.education.pull({
        _id: req.params.edu_id,
      });

      if (!newEducation) {
        return res.status(404).send({ error: 'Education not found!' });
      }

      // Get remove index
      // const removeIndex = profile.education
      //   .map((education) => education.id )
      //   .indexOf(req.params.exp_id);

      // Splice out the array
      // profile.education.splice(removeIndex, 1);

      // Save
      await profile.save();
      res.status(200).send(profile);
    } catch (err) {
      res.status(404).send({ error: 'Education not found!' });
    }
  }
);

// @route    DELETE api/profile/
// @desc     Delete user and profile
// @access   Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    try {
      User.findOneAndDelete({
        _id: req.user.id,
      })
        .then(async () => {
          await Profile.findOneAndDelete({ user: req.user.id });
        })
        .catch(() => {
          res.status(500).send({ error: 'Can not delete user profile!' });
        });

      // await Profile.findOneAndDelete({ user: req.user.id });
      // await User.findOneAndDelete({ _id: req.user.id });

      res.status(200).send({ message: 'Profile deleted successfully' });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);

module.exports = router;
