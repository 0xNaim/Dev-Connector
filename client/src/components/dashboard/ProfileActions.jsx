import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div className='btn-group mb-4' role='group'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-info me-2' />
        Edit Profile
      </Link>
      <Link to='/add-experience' className='btn btn-light'>
        <i className='fab fa-black-tie text-info me-2' />
        Add Experience
      </Link>
      <Link to='/add-education' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-info me-2' />
        Add Education
      </Link>
    </div>
  );
};

export default ProfileActions;
