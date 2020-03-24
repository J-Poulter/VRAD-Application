import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import LoginForm from '../LoginForm/LoginForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      purpose: ''
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
      <main>
        <LoginForm handleLoginSubmit={this.handleLoginSubmit}/>
      </main>
    </div>
  )
 }
  
}

export default App
