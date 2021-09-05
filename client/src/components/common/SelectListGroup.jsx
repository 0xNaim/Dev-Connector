import PropTypes from 'prop-types';
import React from 'react';

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
  const selectOptions = options.map((option) => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className='form-group'>
      <select
        className={
          error
            ? 'form-control form-control mt-3 is-invalid'
            : 'form-control form-control mt-3'
        }
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className='form-text text-muted mt-0'>{info}</small>}
      {error && <div className='invalid-feedback mt-0'>{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default SelectListGroup;
