// External imports
const validator = require('validator');

// Internal imports
const isEmpty = require('./is-empty');

const validateEducationInput = (data) => {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (validator.isEmpty(data.school)) {
    errors.school = 'School field is required';
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  }

  if (validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = 'Study field is required';
  }

  if (validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateEducationInput;
