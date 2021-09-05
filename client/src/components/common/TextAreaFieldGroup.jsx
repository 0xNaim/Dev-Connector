import PropTypes from 'prop-types';
import React from 'react';

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
}) => {
  return (
    <div className='form-group'>
      <textarea
        className={
          error
            ? 'form-control form-control mt-3 is-invalid'
            : 'form-control form-control mt-3'
        }
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        rows='5'
        autoComplete='off'
      />
      {info && <small className='form-text text-muted mt-0'>{info}</small>}
      {error && <div className='invalid-feedback mt-0'>{error}</div>}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default TextAreaFieldGroup;
