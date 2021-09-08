import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const ProfileGithub = ({ githubUsername }) => {
  const [githubRepository, setGithubRepository] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${githubUsername}/repos?per_page=5&sort=created_at:asc`
    )
      .then((res) => res.json())
      .then((data) => {
        setGithubRepository(data);
      })
      .catch((err) => console.log(err));
  }, [githubUsername]);

  const repoItems =
    githubRepository.length > 0 &&
    githubRepository.map((repo) => (
      <div key={repo.id} className='card card-body mb-2'>
        <div className='row'>
          <div className='col-md-6'>
            <h4>
              <a
                href={repo.html_url}
                rel='noreferrer'
                className='text-info'
                target='_blank'
              >
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
            <span className='badge alert-warning'>{repo.language}</span>
          </div>
          <div className='col-md-6 text-end'>
            <span className='badge alert-info me-1'>
              Stars: {repo.stargazers_count}
            </span>
            <span className='badge alert-secondary me-1'>
              Watchers: {repo.watchers_count}
            </span>
            <span className='badge alert-success'>
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));

  return (
    <div>
      <hr />
      <h3 className='mb-4'>Latest Github Repos</h3>
      {repoItems.length > 0 ? (
        repoItems
      ) : (
        <span className='lead text-muted'>
          Your provided GitHub username was invalid.
        </span>
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  githubUsername: PropTypes.string.isRequired,
};

export default ProfileGithub;
