import React from 'react';
import PropTypes from 'prop-types';
import './UserProfile.css'

const UserProfile = ({ email, purpose, username }) => {
  return (
    <section className="user-profile">
      <h4>Welcome, {username}!</h4>
      <p>Current travel purpose: {purpose}.</p>
    </section>
  )
}

UserProfile.propTypes = {
  email: PropTypes.string.isRequired,
  purpose: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

export default UserProfile;
