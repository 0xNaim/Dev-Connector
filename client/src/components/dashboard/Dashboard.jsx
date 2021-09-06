import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteAccount, getCurrentProfile } from '../../actions/profileAction';
import Spinner from '../common/Spinner';
import Education from './Education';
import Experience from './Experience';
import ProfileActions from './ProfileActions';


const Dashboard = ({ getCurrentProfile, deleteAccount, auth, profile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  // Delete handler
  const handleDelete = () => {
    console.log('Account Deleted!');
    deleteAccount();
  };

  let dashboardContent;
  if (profile.profile === null || profile.loading) {
    dashboardContent = <Spinner />;
  } else {
    // Check if logged in user has profile data
    if (Object.keys(profile.profile).length > 0) {
      dashboardContent = (
        <div>
          <p className='lead'>
            Welcome{' '}
            <Link
              to={`/profile/${profile.profile.handle}`}
              className='text-decoration-none'
            >
              {auth.user.name}
            </Link>
          </p>
          <ProfileActions />
          <Experience experience={profile.profile.experience} />
          <hr />
          <Education education={profile.profile.education} />
          <div style={{ marginBottom: '60px' }} />
          <button
            type='button'
            onClick={handleDelete}
            className='btn btn-danger'
          >
            Delete Account
          </button>
        </div>
      );
    } else {
      // User is logged in but has no profile
      dashboardContent = (
        <div>
          <p className='lead'>Welcome {auth.user.name}</p>
          <p>You have not yet setup a profile, please add some info</p>
          <Link
            to='create-profile'
            className='btn btn-lg btn-info'
            style={{ marginBottom: '230px' }}
          >
            Create Profile
          </Link>
        </div>
      );
    }
  }

  return (
    <div className='dashboard'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='display-4'>Dashboard</h1>
            {dashboardContent}
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
