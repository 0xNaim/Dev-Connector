const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create profile schema
const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  handle: {
    type: String,
    required: true,
    max: 40,
  },
  company: String,
  website: String,
  location: String,
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: String,
  githubUsername: String,
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: String,
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldOfStudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    facebook: String,
    youtube: String,
    twitter: String,
    linkedin: String,
    instagram: String,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('Profile', profileSchema);
