import React from 'react';
import PropTypes from 'prop-types';
import './AreaCardContainer.css';

// components ------------------------------
import AreaCard from '../AreaCard/AreaCard';

const AreaCardContainer = ({ areaDetails, handleViewListingsClick }) => {
  const renderedAreaCards = areaDetails.map(area => (
    <AreaCard
      area={area}
      handleViewListingsClick={handleViewListingsClick}
      key={area.id}
    />
  ))

  return (
    <section className="area-cards-container">
      {renderedAreaCards}
    </section>
  )
}

AreaCardContainer.propTypes = {
  areaDetails: PropTypes.arrayOf(PropTypes.shape({
    shortname: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    location: PropTypes.string,
    about: PropTypes.string,
    region_code: PropTypes.number,
    quick_search: PropTypes.string,
    listings: PropTypes.arrayOf(PropTypes.string)
  })).isRequired,
  handleViewListingsClick: PropTypes.func.isRequired
}

export default AreaCardContainer;
