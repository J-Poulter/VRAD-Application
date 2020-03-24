import React, { Component } from 'react'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      purpose: ''
    }
  }
  
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { username, email, purpose } = this.state;

    return (
      <form onSubmit={this.props.handleLoginSubmit}>
        <label htmlFor="username">Username:       
          <input 
          id="username"
          name="username"
          onChange={this.handleInput}
          type="text" 
          value={username}
        />
        </label> 
        <label htmlFor="email">Email:       
          <input 
          id="email"
          name="email"
          onChange={this.handleInput}
          type="text" 
          value={email}
        />
        </label> 
        <label htmlFor="purpose">Purpose:       
          <input 
          id="purpose"
          name="purpose"
          onChange={this.handleInput}
          type="text" 
          value={purpose}
        />
        </label> 
        <button type="submit">Log In</button>
      </form>
    )
  }
}

export default LoginForm;