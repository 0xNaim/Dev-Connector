import PropTypes from 'prop-types';
import React from 'react';
import isEmpty from '../../validation/isEmpty';
import Spinner from '../common/Spinner';

const ProfileAbout = ({ singleProfile }) => {
  const { profile, loading } = singleProfile;

  let profileContent;
  if (profile === null || loading) {
    profileContent = <Spinner />;
  } else {
    // Get first name
    const firstName = profile.user.name.trim().split(' ')[0];

    // Skill list
    const skills = profile.skills.map((skill, index) => (
      <div key={index} className='p-3'>
        <i className='fa fa-check' /> {skill}
      </div>
    ));

    profileContent = (
      <div className='col-md-12'>
        <div className='card card-body bg-light mb-3'>
          <h3 className='text-center text-info'>{firstName}'s Bio</h3>
          <p className='lead text-center'>
            {isEmpty(profile.bio) ? (
              <span>{firstName} does not have a bio</span>
            ) : (
              <span>{profile.bio}</span>
            )}
          </p>
          <hr />
          <h3 className='text-center text-info'>Skills Set</h3>
          <div className='row'>
            <div className='d-flex flex-wrap justify-content-center align-items-center'>
              {skills}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className='row'>{profileContent}</div>;
};

ProfileAbout.propTypes = {
  singleProfile: PropTypes.object.isRequired,
};

export default ProfileAbout;
