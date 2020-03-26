import React from 'react';
import PropTypes from 'prop-types'
import './ListingDetail.css';

const ListingDetail = ({ listing }) => {
  const { address, area, details, listing_id, name } = listing;
  const features = details.features.map(feature => {
    return <li key={feature}>{feature}</li>
  })

  return (
    <article>
      <p>{name}</p>
      <p>Area: {area}</p>
      <p>{address.street}</p>
      <p>Denver, CO {address.zip}</p>
      <p>Beds: {details.beds}</p>
      <p>Baths: {details.baths}</p>
      <p>${details.cost_per_night}/night</p>
      <ul>{features}</ul>
      <section>
        <img src={`/images/${listing_id}_a.jpg`} alt="listing image 1" />
        <img src={`/images/${listing_id}_b.jpg`} alt="listing image 2" />
        <img src={`/images/${listing_id}_c.jpg`} alt="listing image 3" />
      </section>
      <button 
        onClick={() => props.handleAddFavoriteClick(listing)}
        type="button">Add to Favorites</button>
    </article>
  )
}

ListingCard.propTypes = {
  listing: PropTypes.shape({
    address: PropTypes.shape({
      street: PropTypes.string,
      zip: PropTypes.string,
    }),
    area: PropTypes.string,
    details: PropTypes.shape({
      baths: PropTypes.number,
      beds: PropTypes.number,
      cost_per_night: PropTypes.number,
      features: PropTypes.arrayOf(PropTypes.string),
      neighborhood_id: PropTypes.number,
      seller_source: PropTypes.string,
      superhost: PropTypes.bool,
    }),
    listing_id: PropTypes.number,
    name: PropTypes.string
  }),
  handleAddFavoriteClick: PropTypes.func.isRequired
}

export default ListingDetail;
