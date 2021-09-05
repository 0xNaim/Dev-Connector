import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Landing = ({ auth, history }) => {
  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/dashboard');
    }
  }, [auth, history]);

  return (
    <div className='landing'>
      <div className='dark-overlay landing-inner text-light'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <h1 className='display-3 mb-4'>Developer Connector</h1>
              <p className='lead'>
                Create a developer profile/portfolio, share posts and get help
                from other developers
              </p>
              <br />
              <Link to='/register' className='btn btn-lg btn-info me-2'>
                Sign up
              </Link>
              <Link to='/login' className='btn btn-lg btn-light'>
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
