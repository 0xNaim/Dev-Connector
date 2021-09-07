import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addEducation } from '../../actions/profileActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';

const AddEducation = ({ addEducation, errors, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
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

    const educationData = {
      school: formData.school,
      degree: formData.degree,
      fieldOfStudy: formData.fieldOfStudy,
      from: formData.from,
      to: formData.to,
      current: checkUnchecked,
      description: formData.description,
    };

    // Redux action
    addEducation(educationData, history);
  };

  useEffect(() => {
    setError(errors);
  }, [errors]);

  return (
    <div className='add-education'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <Link to='/dashboard' className='btn btn-light'>
              &#8592; Go Back
            </Link>
            <h1 className='display-4 text-center'>Add Education</h1>
            <p className='lead text-center'>
              Add any school, bootcamp, etc that you have attended
            </p>
            <small className='d-block pb-3'>* = required fields</small>
            <form>
              <TextFieldGroup
                placeholder='* School Name'
                name='school'
                value={formData.school}
                onChange={handleChange}
                error={error.school}
              />
              <TextFieldGroup
                placeholder='* Degree or Certification'
                name='degree'
                value={formData.degree}
                onChange={handleChange}
                error={error.degree}
              />
              <TextFieldGroup
                placeholder='* Field of Study'
                name='fieldOfStudy'
                value={formData.fieldOfStudy}
                onChange={handleChange}
                error={error.fieldOfStudy}
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
                placeholder='Program Description'
                name='description'
                value={formData.description}
                onChange={handleChange}
                error={error.description}
                info='Tell us about the program that you were in'
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
