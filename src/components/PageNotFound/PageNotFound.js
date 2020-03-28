import React from 'react';
import { NavLink } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => {
  return (
    <>
      <p className="page-not-found">
        The page you've requested does not exist.
      </p>
      <NavLink to="/" className="nav-link">
        Return to sign in
      </NavLink>
    </>
  );
};

export default PageNotFound;
