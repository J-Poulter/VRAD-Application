import React from 'react';
import './AreaCard.css';

const AreaCard = (props) => {

  const { about, id, name, shortname } = props.area;


  return (
    <article className="areaCard">
      <h2 className="areaCardShortName">{shortname}</h2>
      <h3 className="areaCardName">({name})</h3>
      <p className="areaCardDescription">{about}</p>
      <button 
        className="button areaButton"
        id={id}
        // onClick={this.viewListing}
        type="button"
      >
        View Listings
        </button>
    </article>
  )
}

export default AreaCard;