import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

const Login = ({ loginUser, errors, auth, history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: formData.email,
      password: formData.password,
    };

    // Redux action
    loginUser(userData);
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/dashboard');
    }

    // Set errors
    setError(errors);

    if (auth.isAuthenticated) {
      history.push('/dashboard');
    }
  }, [errors, auth, history]);

  return (
    <div className='login'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Log In</h1>
            <p className='lead text-center mb-5'>
              Sign in to your DevConnector account
            </p>
            <form noValidate onSubmit={handleSubmit}>
              <TextFieldGroup
                type='email'
                name='email'
                value={formData.email}
                placeholder='Email Address'
                onChange={handleChange}
                error={error.email}
              />

              <TextFieldGroup
                type='password'
                name='password'
                value={formData.password}
                placeholder='Password'
                onChange={handleChange}
                error={error.password}
              />
              <button type='submit' className='btn btn-info btn-block mt-4' style={{marginBottom: '140px'}}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
