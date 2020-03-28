import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';

// api ------------------------------
import { getAreas, getAreaDetails, getListings } from '../../apiCalls/apiCalls';

// components ------------------------------
import AreaCardContainer from '../AreaCardContainer/AreaCardContainer';
import Header from '../Header/Header';
import ListingCardContainer from '../ListingCardContainer/ListingCardContainer';
import ListingDetail from '../ListingDetail/ListingDetail';
import LoginForm from '../LoginForm/LoginForm';
import PageNotFound from '../PageNotFound/PageNotFound';
import UserProfile from '../UserProfile/UserProfile';

class App extends Component {
  constructor() {
    super();
    this.state = {
      areaDetails: [],
      email: '',
      error: null,
      favorites: [],
      isAuthenticated: false,
      isLoading: true,
      listings: [],
      purpose: '',
      username: '',
    }
  }

  async componentDidMount() {
    try {
      const areas = await getAreas();
      const areaDetails = await getAreaDetails(areas);
      this.setState({
        areaDetails,
        isLoading: false
      })
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      })
      console.error(error.message);
    }
  }

  handleAddFavoriteClick = (listing) => {
    const { favorites } = this.state;
    const alreadyFavorite = favorites.find(favorite => {
      return favorite.listing_id === listing.listing_id;
    })

    if(alreadyFavorite) {
      this.setState({
        favorites: favorites.filter(favorite => {
          return favorite.listing_id !== listing.listing_id;
        })
      })
    } else {
      this.setState({
        favorites: [...favorites, listing]
      })
    }
  }

  isListingFavorite = (listing_id) => {
    const { favorites } = this.state;
    return !!favorites.find(favorite => {
      return favorite.listing_id === listing_id;
    })
  }

  handleViewListingsClick = async (areaListings) => {
    this.setState({
      isLoading: true
    })

    try {
      const listings = await getListings(areaListings);
      this.setState({
        listings,
        isLoading: false
      })
    } catch (error) {
      console.log(error);
      this.setState({
        error
      })
      console.error(error.message);
    }
  }


  handleLoginSubmit = ({ username, email, purpose }) => {
    this.setState({
      username,
      email,
      purpose,
      isAuthenticated: true
    })
  }

  handleLogoutClick = () => {
    this.setState({
      isAuthenticated: false
    })
  }

  findListing = (listingId) => {
    return this.state.listings.find(listing => {
      return listing.listing_id === parseInt(listingId)
    })
  }

  render() {
    const {
      areaDetails,
      email,
      error,
      favorites,
      isAuthenticated,
      isLoading,
      listings,
      purpose,
      username,
    } = this.state;

    return (
      <div className="App">
        <Header
          handleLogoutClick={this.handleLogoutClick}
          isAuthenticated={isAuthenticated}
        />
        {isAuthenticated &&
          <UserProfile
            email={email}
            favorites={favorites.length}
            purpose={purpose}
            username={username}
          />}
        <main className="main">
          <section className="main-content">
            <Switch>
              <Route
                path="/"
                exact
                render={() => <LoginForm handleLoginSubmit={this.handleLoginSubmit} />}
              />
              <Route
                path="/areas"
                exact
                render={() => (
                  <AreaCardContainer
                    areaDetails={areaDetails}
                    error={error}
                    handleViewListingsClick={this.handleViewListingsClick}
                    isLoading={isLoading}
                  />
                )}
              />
              <Route
                path="/areas/:area_id/listings/"
                exact
                render={() => {
                  return (
                    <ListingCardContainer
                      error={error}
                      isLoading={isLoading}
                      listings={listings}
                    />
                  )
                }}
              />
              <Route
                path="/favorites"
                exact
                render={() => {
                  return <ListingCardContainer listings={favorites} />
                }}
              />
              <Route
                path="/areas/:area_id/listings/:listing_id"
                render={({ match }) => {
                  const { listing_id } = match.params;
                  const selectedListing = this.findListing(listing_id);
                  return <ListingDetail handleAddFavoriteClick={this.handleAddFavoriteClick} isListingFavorite={this.isListingFavorite} listing={selectedListing} />
                }}
              />
              <Route component={PageNotFound} />
            </Switch>
          </section>
        </main>
      </div>
    )
  }
}

export default App;
