import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createProfile } from '../../actions/profileActions';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';

const CreateProfile = ({ createProfile, errors, history }) => {
  const [formData, setFormData] = useState({
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubUsername: '',
    bio: '',
    facebook: '',
    youtube: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    error: {},
  });
  const [displaySocialInputs, setDisplaySocialInputs] = useState(false);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      handle: formData.handle,
      company: formData.company,
      website: formData.website,
      location: formData.location,
      status: formData.status,
      skills: formData.skills,
      githubUsername: formData.githubUsername,
      bio: formData.bio,
      facebook: formData.facebook,
      youtube: formData.youtube,
      instagram: formData.instagram,
      twitter: formData.twitter,
      linkedin: formData.linkedin,
    };

    // Redux action
    createProfile(profileData, history);
  };

  useEffect(() => {
    setError(errors);
  }, [errors]);

  const handleToggle = () => {
    setDisplaySocialInputs((prevState) => !prevState);
  };

  let socialInputs;
  if (displaySocialInputs) {
    socialInputs = (
      <div>
        <InputGroup
          placeholder='Facebook profile URL'
          name='facebook'
          icon='fab fa-facebook'
          value={formData.facebook}
          onChange={handleChange}
          error={error.facebook}
        />
        <InputGroup
          placeholder='Youtube channel URL'
          name='youtube'
          icon='fab fa-youtube'
          value={formData.youtube}
          onChange={handleChange}
          error={error.youtube}
        />
        <InputGroup
          placeholder='Instagram profile URL'
          name='instagram'
          icon='fab fa-instagram'
          value={formData.instagram}
          onChange={handleChange}
          error={error.instagram}
        />
        <InputGroup
          placeholder='Twitter profile URL'
          name='twitter'
          icon='fab fa-twitter'
          value={formData.twitter}
          onChange={handleChange}
          error={error.twitter}
        />
        <InputGroup
          placeholder='Linkedin profile URL'
          name='linkedin'
          icon='fab fa-linkedin'
          value={formData.linkedin}
          onChange={handleChange}
          error={error.linkedin}
        />
      </div>
    );
  }

  // Select options for status
  const options = [
    { label: '* Select professional status', value: '' },
    { label: 'Senior Developer', value: 'Senior Developer' },
    { label: 'Junior Developer', value: 'Junior Developer' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Student or learning', value: 'Student or learning' },
    { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
    { label: 'Intern', value: 'Intern' },
    { label: 'Other', value: 'Other' },
  ];

  return (
    <div className='create-profile'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <Link to='/dashboard' className='btn btn-light'>
              &#8592; Go Back
            </Link>
            <h1 className='display-4 text-center'>Create your profile</h1>
            <p className='lead text-center'>
              Let's get some information to make your profile stand out
            </p>
            <small className='d-block pb-3'>* = required fields</small>
            <form>
              <TextFieldGroup
                placeholder='* Your Name'
                name='handle'
                value={formData.handle}
                onChange={handleChange}
                error={error.handle}
                info='A unique handle for your profile URL. Your full name, company name, nickname'
              />
              <SelectListGroup
                placeholder='* Statue'
                name='status'
                value={formData.status}
                onChange={handleChange}
                options={options}
                error={error.status}
                info='Give us an idea of where you are at in your career'
              />
              <TextFieldGroup
                placeholder='* Skills'
                name='skills'
                value={formData.skills}
                onChange={handleChange}
                error={error.skills}
                info='Please add comama seperated values (eg. HTML,CSS,JavaScript)'
              />
              <TextFieldGroup
                placeholder='Company Name'
                name='company'
                value={formData.company}
                onChange={handleChange}
                error={error.company}
                info='Could be your own company or one you work for'
              />
              <TextFieldGroup
                placeholder='Website'
                name='website'
                value={formData.website}
                onChange={handleChange}
                error={error.website}
                info='Could be your own website or a company one'
              />
              <TextFieldGroup
                placeholder='Location'
                name='location'
                value={formData.location}
                onChange={handleChange}
                error={error.location}
                info='City or city & state suggested (eg. Boston, MA)'
              />

              <TextFieldGroup
                placeholder='Github Username'
                name='githubUsername'
                value={formData.githubUsername}
                onChange={handleChange}
                error={error.githubUsername}
                info='If you want your latest github repos and a Github link, include your usename'
              />
              <TextAreaFieldGroup
                placeholder='Short Bio'
                name='bio'
                value={formData.bio}
                onChange={handleChange}
                error={error.bio}
                info='Tell us a little about yourself'
              />

              <div className='mt-3 mb-3'>
                <button
                  type='button'
                  onClick={handleToggle}
                  className='btn btn-light me-2'
                >
                  Add social network links
                </button>
                <span className='text-muted'>Optional</span>
              </div>
              {socialInputs}
            </form>
            <button
              type='button'
              className='btn btn-info mt-3 form-control'
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
