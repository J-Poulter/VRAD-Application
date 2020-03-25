import React, { Component } from 'react';
import './App.css';

// api ------------------------------
import { getAreas, getAreaDetails } from '../../apiCalls/apiCalls';

// components ------------------------------
import Header from '../Header/Header';
import LoginForm from '../LoginForm/LoginForm';
import AreaCardContainer from '../AreaCardContainer/AreaCardContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      purpose: '',
      error: null,
      isLoading: true,
      areaDetails: []
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


  handleLoginSubmit = ({ username, email, purpose }) => {
    this.setState({
      username,
      email,
      purpose
    })
  }

  render() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <LoginForm handleLoginSubmit={this.handleLoginSubmit}/>
        <AreaCardContainer areaDetails={this.state.areaDetails}/>
      </main>
    </div>
  )
 }

}

export default App
