import React from 'react';
import PropTypes from 'prop-types';

const UserProfile = ({ email, purpose, username }) => {
  return (
    <section className="userprofile">
      <p>{username}</p>
      <p>{email}</p>
      <p>{purpose}</p>
    </section>
  )
}

UserProfile.propTypes = {
  email: PropTypes.string.isRequired,
  purpose: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

export default UserProfile;
