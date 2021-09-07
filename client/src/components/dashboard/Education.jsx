import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profileActions';

const Education = ({ education, deleteEducation }) => {
  const handleDelete = (id) => {
    deleteEducation(id);
  };

  const edu = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        {moment(edu.from).format('MM/YYYY')} -{' '}
        {edu.to === null ? 'Running' : moment(edu.t0).format('MM/YYYY')}
      </td>
      <td className='text-end'>
        <button
          onClick={() => handleDelete(edu._id)}
          className='btn btn-danger me-auto'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      <h2 className='mb-4'>Education Credentials</h2>
      {edu.length === 0 ? (
        <p className='text-center text-muted'>
          There is no education available
        </p>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th className='text-end'>Action</th>
            </tr>
          </thead>
          <tbody>{edu}</tbody>
        </table>
      )}
    </div>
  );
};

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
