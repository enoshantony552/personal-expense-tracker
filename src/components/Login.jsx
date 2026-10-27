import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../Login.css';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  function handleLogin(e) {
    e.preventDefault();

    const users = JSON.parse(
      localStorage.getItem('users') || '[]'
    );

    const existingUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (existingUser) {
      localStorage.setItem('loggedInUser', existingUser.email);
      navigate('/dashboard');
    } else {
      setMessage('Invalid email or password');
    }
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-header">
          <div className="login-icon">💰</div>
          <h2>Expense Tracker</h2>
          <p>Welcome back! Please login to your account.</p>
        </div>

        {message && (
          <p className="login-message" role="alert">
            {message}
          </p>
        )}

        <form onSubmit={handleLogin}>

          <div className="login-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-submit">
            Login
          </button>

        </form>

        <div className="login-actions">
          <p>Don't have an account?</p>

          <button
            type="button"
            className="create-account-btn"
            onClick={() => navigate('/register')}
          >
            Create an Account
          </button>

          <button
            type="button"
            className="login-home-btn"
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </button>
        </div>

      </div>

      <p className="login-footer">
        Track your spending. Build better habits.
      </p>

    </div>
  );
}

export default Login;