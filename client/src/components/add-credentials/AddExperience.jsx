import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addExperience } from '../../actions/profileAction';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';

const AddExperience = ({ addExperience, errors, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    description: '',
  });
  const [checkUnchecked, setCheckUnchecked] = useState(false);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = () => {
    setCheckUnchecked((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const experienceData = {
      company: formData.company,
      title: formData.title,
      location: formData.location,
      from: formData.from,
      to: formData.to,
      current: checkUnchecked,
      description: formData.description,
    };

    // Redux action
    addExperience(experienceData, history);
  };

  useEffect(() => {
    setError(errors);
  }, [errors]);

  return (
    <div className='add-experience'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <Link to='/dashboard' className='btn btn-light'>
              &#8592; Go Back
            </Link>
            <h1 className='display-4 text-center'>Add Experience</h1>
            <p className='lead text-center'>
              Add any job or position that you have had in the past or current
            </p>
            <small className='d-block pb-3'>* = required fields</small>
            <form>
              <TextFieldGroup
                placeholder='* Company Name'
                name='company'
                value={formData.company}
                onChange={handleChange}
                error={error.company}
              />
              <TextFieldGroup
                placeholder='* Job Title'
                name='title'
                value={formData.title}
                onChange={handleChange}
                error={error.title}
              />
              <TextFieldGroup
                placeholder='Location'
                name='location'
                value={formData.location}
                onChange={handleChange}
                error={error.location}
              />
              <h6 className='mt-3' style={{ marginBottom: '-10px' }}>
                From Date
              </h6>
              <TextFieldGroup
                type='date'
                name='from'
                value={formData.from}
                onChange={handleChange}
                error={error.from}
              />
              <h6 className='mt-3' style={{ marginBottom: '-10px' }}>
                To Date
              </h6>
              <TextFieldGroup
                type='date'
                name='to'
                value={formData.to}
                onChange={handleChange}
                error={error.to}
                disabled={checkUnchecked ? 'disabled' : ''}
              />
              <div className='form-check mt-3'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='current'
                  name='current'
                  value={formData.current}
                  checked={checkUnchecked}
                  onChange={handleCheck}
                />
                <label htmlFor='current' className='form-check-label'>
                  Current Job
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder='Job Description'
                name='description'
                value={formData.description}
                onChange={handleChange}
                error={error.description}
                info='Tell us about your position'
              />
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { addExperience })(
  withRouter(AddExperience)
);
