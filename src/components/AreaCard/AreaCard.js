import React from 'react';
import PropTypes from 'prop-types';
import './AreaCard.css';

const AreaCard = ({ area, handleViewListingsClick }) => {
  const { about, id, name, shortname } = area;

  return (
    <article className="area-card">
      <h2 className="area-card-short-name">{shortname}</h2>
      <h3 className="area-card-name">({name})</h3>
      <p className="area-card-description">{about}</p>
      <button
        className="button area-button"
        id={id}
        onClick={() => handleViewListingsClick(id)}
        type="button"
      >
        View Listings
        </button>
    </article>
  )
}

AreaCard.propTypes = {
  area: PropTypes.shape({
    about: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    shortname: PropTypes.string,
  }).isRequired
}

export default AreaCard;
