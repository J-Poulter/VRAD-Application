import React, { Component } from 'react';
import './App.css';

// api ------------------------------
import { getAreas, getAreaDetails } from '../../apiCalls/apiCalls';

// components ------------------------------
import Header from '../Header/Header';
import LoginForm from '../LoginForm/LoginForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      purpose: '',
      areaDetails: []
    }
  }

  async componentDidMount() {
    try {
      const areas = await getAreas();
      const areaDetails = await getAreaDetails(areas);
      console.log(areaDetails);
      console.log(this.state);

    } catch (error) {
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
      </main>
    </div>
  )
 }

}

export default App
