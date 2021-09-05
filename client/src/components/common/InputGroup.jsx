import PropTypes from 'prop-types';
import React from 'react';

const InputGroup = ({
  name,
  type,
  placeholder,
  value,
  error,
  icon,
  onChange,
}) => {
  return (
    <div className='input-group'>
      <div className='input-group mb-3'>
        <div className='input-group-prepend'>
          <span className='input-group-text p-3'>
              <i className={icon} />
          </span>
        </div>
        <input
          className={
            error
              ? 'form-control form-control is-invalid'
              : 'form-control form-control'
          }
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete='off'
        />
      </div>
      {error && <div className='invalid-feedback mt-0'>{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

InputGroup.defaultProps = {
  type: 'text',
};

export default InputGroup;
