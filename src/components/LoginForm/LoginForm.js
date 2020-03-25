import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './LoginForm.css'

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

    handleSubmit = (e) => {
      e.preventDefault();
      const { username, email, purpose } = this.state;
      this.props.handleLoginSubmit({
        username,
        email,
        purpose
      });
      this.setState({
        username: '',
        email: '',
        purpose: ''
      })
    }

  render() {
    const { username, email, purpose } = this.state;

    return (
      <form
        className="form-login"
        onSubmit={this.handleSubmit}
      >
        <label htmlFor="username">Username:
          <input
          id="username"
          name="username"
          onChange={this.handleInput}
          required
          type="text"
          value={username}
        />
        </label>
        <label htmlFor="email">Email:
          <input
          id="email"
          name="email"
          onChange={this.handleInput}
          required
          type="email"
          value={email}
        />
        </label>
        <label htmlFor="purpose">Purpose:
          <select
          id="purpose"
          name="purpose"
          onChange={this.handleInput}
          required
          value={purpose}
        >
            <option value="" selected disabled hidden>Select</option>
          <option value="vacation">Vacation</option>
          <option value="business">Business</option>
          <option value="other">Other</option>
        </select>
        </label>
        <button type="submit">Log In</button>
      </form>
    )
  }
}

LoginForm.propTypes = {
  handleLoginSubmit: PropTypes.func.isRequired,
}

export default LoginForm;
