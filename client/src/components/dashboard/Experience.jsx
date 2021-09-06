import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profileAction';

const Experience = ({ experience, deleteExperience }) => {
  const handleDelete = (id) => {
    deleteExperience(id);
  };

  const exp = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        {moment(exp.from).format('MM/YYYY')} -{' '}
        {exp.to === null ? 'Running' : moment(exp.t0).format('MM/YYYY')}
      </td>
      <td className='text-end'>
        <button
          onClick={() => handleDelete(exp._id)}
          className='btn btn-danger me-auto'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      <h2 className='mb-4'>Experience Credentials</h2>
      {exp.length === 0 ? (
        <p className='text-center text-muted'>
          There is no experience available
        </p>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th className='text-end'>Action</th>
            </tr>
          </thead>
          <tbody>{exp}</tbody>
        </table>
      )}
    </div>
  );
};

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
