import moment from 'moment';
import React from 'react';

const ProfileCreds = ({ singleProfile }) => {
  const { experience, education } = singleProfile.profile;
  console.log(experience, education);

  // Experience
  const expItems = experience.map((exp) => (
    <li key={exp._id} className='list-group-item'>
      <h4>{exp.company}</h4>
      <p>
        {moment(exp.from).format('MM/YYYY')} -{' '}
        {exp.to === null ? 'Running' : moment(exp.to).format('MM/YYYY')}
      </p>
      <p>
        <strong>Position:</strong> {exp.title}
      </p>
      <p>
        {exp.location === '' ? null : (
          <span>
            <strong>Location:</strong> {exp.location}
          </span>
        )}
      </p>
      <p>
        {exp.description === '' ? null : (
          <span>
            <strong>Description:</strong> {exp.description}
          </span>
        )}
      </p>
    </li>
  ));

  // Education
  const eduItems = education.map((edu) => (
    <li key={edu._id} className='list-group-item'>
      <h4>{edu.school}</h4>
      <p>
        {moment(edu.from).format('MM/YYYY')} -{' '}
        {edu.to === null ? 'Running' : moment(edu.to).format('MM/YYYY')}
      </p>
      <p>
        <strong>Degree:</strong> {edu.degree}
      </p>
      <p>
        <strong>Field Of Study:</strong> {edu.fieldOfStudy}
      </p>
      <p>
        {edu.description === '' ? null : (
          <span>
            <strong>Description:</strong> {edu.description}
          </span>
        )}
      </p>
    </li>
  ));

  return (
    <div className='row'>
      <div className='col-md-6'>
        <h3 className='text-center text-info'>Experience</h3>
        {expItems.length > 0 ? (
          <ul className='list-group'>{expItems}</ul>
        ) : (
          <p className='text-center'>No Experience Listed</p>
        )}
      </div>

      <div className='col-md-6'>
        <h3 className='text-center text-info'>Education</h3>
        {eduItems.length > 0 ? (
          <ul className='list-group'>{eduItems}</ul>
        ) : (
          <p className='text-center'>No Education Listed</p>
        )}
      </div>
    </div>
  );
};

export default ProfileCreds;
