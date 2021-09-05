import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

const Register = ({ registerUser, auth, errors, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
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

    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password2: formData.password2,
    };

    // Redux action
    registerUser(newUser, history);
  };

  useEffect(() => {
    setError(errors);

    if (auth.isAuthenticated) {
      history.push('/dashboard');
    }
  }, [auth, history, errors]);

  return (
    <div className='register'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Sign Up</h1>
            <p className='lead text-center mb-4'>
              Create your DevConnector account
            </p>
            <form noValidate onSubmit={handleSubmit}>
              <TextFieldGroup
                name='name'
                value={formData.name}
                placeholder='Name'
                onChange={handleChange}
                error={error.name}
              />

              <TextFieldGroup
                type='email'
                name='email'
                value={formData.email}
                placeholder='Email Address'
                onChange={handleChange}
                error={error.email}
                info='This site uses Gravatar so if you want a profile image, use a Gravatar email'
              />

              <TextFieldGroup
                type='password'
                name='password'
                value={formData.password}
                placeholder='Password'
                onChange={handleChange}
                error={error.password}
              />

              <TextFieldGroup
                type='password'
                name='password2'
                value={formData.password2}
                placeholder='Confirm Password'
                onChange={handleChange}
                error={error.password2}
              />
              <button
                type='submit'
                className='btn btn-info btn-block mt-4 mb-4'
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
