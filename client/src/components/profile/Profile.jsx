import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileByHandle } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import ProfileHeader from './ProfileHeader';

const Profile = ({ getProfileByHandle, profile, match }) => {
  useEffect(() => {
    if (match.params.handle) {
      getProfileByHandle(match.params.handle);
    }
  }, [getProfileByHandle, match.params.handle]);

  const { singleProfile, loading } = profile;
  let profileContent;

  if (singleProfile === null || loading) {
    profileContent = <Spinner />;
  } else {
    profileContent = (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <Link to='/profiles' className='btn btn-light mb-3 float-start'>
              &larr; Back To Profiles
            </Link>
          </div>
          <div className='col-md-6' />
        </div>
        <ProfileHeader singleProfile={profile} />
        <ProfileAbout />
        <ProfileCreds />
        <ProfileGithub />
      </div>
    );
  }

  return (
    <div className='profile'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>{profileContent}</div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
