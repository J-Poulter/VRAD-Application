import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './AreaCard.css';

const AreaCard = ({ area, handleViewListingsClick }) => {
  const { about, id, listings, name, shortname } = area;

  return (
    <article className="area-card">
      <div className="area-card-header">
        <h2 className="area-card-short-name">{shortname}</h2>
        <h3 className="area-card-name">({name})</h3>
      </div>
      <div className="area-card-body">
        <p className="area-card-description">{about}</p>
      </div>
      <div className="area-card-footer">
        <Link to={`/areas/${id}/listings/`}>
          <button
            className="button area-button"
            id={id}
            onClick={() => handleViewListingsClick(listings)}
            type="button"
          >
            View Listings
            </button>
        </Link>
      </div>
    </article>
  )
}

AreaCard.propTypes = {
  area: PropTypes.shape({
    about: PropTypes.string,
    id: PropTypes.number,
    listings: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    shortname: PropTypes.string,
  }).isRequired
}

export default AreaCard;
