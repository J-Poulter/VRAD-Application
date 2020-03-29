import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './LoginForm.css'

// icons ------------------------------
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faFacebookF, faGooglePlusG, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
library.add(faFacebookF, faGooglePlusG, faLinkedinIn);
dom.watch();

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      purpose: 'vacation',
      redirectToReferrer: false
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
        purpose: 'vacation',
        redirectToReferrer: true
      })
    }

  render() {
    const { email, purpose, redirectToReferrer, username } = this.state;
    const isFormComplete = username && email && purpose;

    if(redirectToReferrer) {
      return <Redirect to="/areas" />
    }

    return (
        <section className="login-form-container" data-testid="login-form">
          <form
            className="login-form"
            onSubmit={this.handleSubmit}
          >
            <h1 className="login-form-title">Log in</h1>
            <article className="social-container">
              <a href="/" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="/" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="/" className="social"><i className="fab fa-linkedin-in"></i></a>
            </article>
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
                <option value="vacation">Vacation</option>
                <option value="business">Business</option>
                <option value="other">Other</option>
              </select>
            </label>
              <button
                disabled={isFormComplete ? '' : 'disabled'}
                type="submit">
                Log In
              </button>
          </form>
        <section className="welcome-message">
          <h1>Hello, {username ? username : 'Friend'}!</h1>
          <p>Log in to begin your {purpose ? purpose : 'journey'} in Denver</p>
        </section>
      </section>
    )
  }
}

LoginForm.propTypes = {
  handleLoginSubmit: PropTypes.func.isRequired,
}

export default LoginForm;
