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
    this.setState({
      favorites: [...this.state.favorites, listing]
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
      purpose
    })
  }

  findListing = (listingId) => {
    console.log(listingId)
    return this.state.listings.find(listing => {
      return listing.listing_id === parseInt(listingId)
    })
  }

  render() {
    const {
      areaDetails,
      email,
      listings,
      purpose,
      username,
    } = this.state;

    return (
      <div className="App">
        <Header />
        <UserProfile email={email} purpose={purpose} username={username} />
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
                    handleViewListingsClick={this.handleViewListingsClick}
                  />
                )}
              />
              <Route
                path="/areas/:area_id/listings/"
                exact
                render={() => {
                  return <ListingCardContainer listings={listings} />
                }}
              />
              <Route
                path="/areas/:area_id/listings/:listing_id"
                render={({ match }) => {
                  const { listing_id } = match.params;
                  const selectedListing = this.findListing(listing_id)
                  return <ListingDetail listing={selectedListing} />
                }}
              />
              {/* <Route component={LoginForm} /> */}              
            </Switch>
          </section>
        </main>
      </div>
    )
  }
}

export default App;
