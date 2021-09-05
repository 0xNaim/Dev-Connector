import PropTypes from 'prop-types';
import React from 'react';

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  onChange,
  disabled,
}) => {
  return (
    <div className='form-group'>
      <input
        type={type}
        className={
          error
            ? 'form-control form-control mt-3 is-invalid'
            : 'form-control form-control mt-3'
        }
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete='off'
      />
      {info && <small className='form-text text-muted mt-0'>{info}</small>}
      {error && <div className='invalid-feedback mt-0'>{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
};

TextFieldGroup.defaultProps = {
  type: 'text',
};

export default TextFieldGroup;
