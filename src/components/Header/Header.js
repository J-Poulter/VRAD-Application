import React from 'react';
import './Header.css';
import logo from './logo.png'

const Header = () => {
  return(
    <header className="header">

    <img className="logo" src={logo} alt="VRAD travel logo"/>

    <nav className="nav">
      <button
        className="button favorite-button"
        type="button"
      >
        Favorites({4})
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

export default Header;
