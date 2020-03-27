import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';

// components ------------------------------
import logo from './logo.png'

const Header = ({ handleLogoutClick, isAuthenticated }) => {
  return(
    <header className="header">
      <div className="header-container">
        <img className="logo" src={logo} alt="VRAD travel logo"/>
        <h1 className="header-title">VRAD</h1>
      </div>
      {isAuthenticated &&
        <nav className="nav">
          <NavLink to="/" className="nav-link" onClick={handleLogoutClick} >
            Log Out
          </NavLink>
        </nav>
      }
    </header>
  )
}

Header.propTypes = {
  handleLogoutClick: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}
export default Header;
