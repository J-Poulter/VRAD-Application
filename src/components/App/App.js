import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import LoginForm from '../LoginForm/LoginForm';

class App extends Component {
 render() {
  return (
    <div className="App">
      <Header />
      <main>
        <LoginForm />
      </main>
    </div>
  )
 }
  
}

export default App
