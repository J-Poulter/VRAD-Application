import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

// components ------------------------------
import logo from './logo.png'

const Header = ({ favorites }) => {
  return(
    <header className="header">
      <div className="header-container">
        <img className="logo" src={logo} alt="VRAD travel logo"/>
        <h1 className="header-title">VRAD</h1>
      </div>
      <nav className="nav">
        <button
          className="button favorite-button"
          type="button"
        >
          Favorites({ favorites })
        </button>
        <button
          className="button logout-button"
          type="button"
        >
          Log Out
        </button>
      </nav>
    </header>
  )
}

Header.propTypes = {
  favorites: PropTypes.number.isRequired,
}

export default Header;
