import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

const Navbar = ({ auth, logoutUser, clearCurrentProfile }) => {
  const handleLogout = (e) => {
    e.preventDefault();
    // Redux action
    clearCurrentProfile();
    logoutUser();
    // window.location.href = '/login';
  };

  const authLinks = (
    <ul className='navbar-nav ms-auto'>
      <li className='nav-item me-2'>
        <Link className='nav-link' to='/dashboard'>
         Dashboard
        </Link>
      </li>
      <li className='nav-item d-flex align-items-center'>
        <img
          className='rounded-circle'
          src={auth.user.avatar}
          alt='User avatar'
          title='Avatar'
          style={{ width: '25px', height: '25px', marginRight: '5px' }}
        />
        <span className='text-white-50 me-2'>{auth.user.name}</span>
        <span
          onClick={handleLogout}
          className='nav-link'
          style={{ cursor: 'pointer' }}
        >
          Logout
        </span>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='navbar-nav ms-auto'>
      <li className='nav-item'>
        <Link className='nav-link' to='/register'>
          Sign Up
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          DevConnector
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#mobile-nav'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='mobile-nav'>
          <ul className='navbar-nav me-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/profiles'>
                {' '}
                Developers
              </Link>
            </li>
          </ul>
          {auth.isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
