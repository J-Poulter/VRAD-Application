import React from 'react';
import './AreaCard.css';

const AreaCard = (props) => {
  const { about, id, name, shortname } = props.area;

  return (
    <article className="area-card">
      <h2 className="area-card-short-name">{shortname}</h2>
      <h3 className="area-card-name">({name})</h3>
      <p className="area-card-description">{about}</p>
      <button
        className="button area-button"
        id={id}
        onClick={() => props.handleViewListingsClick(id)}
        type="button"
      >
        View Listings
        </button>
    </article>
  )
}

export default AreaCard;
