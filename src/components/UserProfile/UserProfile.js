import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './UserProfile.css'

const UserProfile = ({ favorites, purpose, username }) => {
  return (
    <section className="user-profile" data-testid="user-profile">
      <div>
        <h4>Welcome, {username}!</h4>
        <p>Current travel purpose: {purpose}.</p>
      </div>
      <div>
        <Link to="/favorites">
          <button
            className="button favorite-button"
            type="button"
          >
            Favorites({favorites})
            </button>
        </Link>
      </div>
    </section>
  )
}

UserProfile.propTypes = {
  favorite: PropTypes.number,
  purpose: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

export default UserProfile;
