import React, { Component } from 'react';
import './App.css';

// api ------------------------------
import { getAreas, getAreaDetails, getListings } from '../../apiCalls/apiCalls';

// components ------------------------------
import Header from '../Header/Header';
import LoginForm from '../LoginForm/LoginForm';
import AreaCardContainer from '../AreaCardContainer/AreaCardContainer';
import UserProfile from '../UserProfile/UserProfile';

class App extends Component {
  constructor() {
    super();
    this.state = {
      areaDetails: [],
      email: '',
      error: null,
      favorites: [],
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

  handleViewListingsClick = async (id) => {
    const areaListings = [...this.state.areaDetails]
      .filter(area => area.id === id)
      .pop()
      .listings;

    try {
      const listings = await getListings(areaListings);
      this.setState({
        listings
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

  render() {
    const { email, purpose, username, areaDetails } = this.state;

    return (
      <div className="App">
        <Header />
        <main className="main">
          <UserProfile email={email} purpose={purpose} username={username} />
          <section className="main-content">
            <LoginForm handleLoginSubmit={this.handleLoginSubmit} />
            <AreaCardContainer
              areaDetails={areaDetails}
              handleViewListingsClick={this.handleViewListingsClick}
            />
          </section>
        </main>
      </div>
    )
  }
}

export default App;
