import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../Register.css';

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  function fetchName(event) {
    setName(event.target.value);
  }

  function handleRegister(e) {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setMessage('Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    const users = JSON.parse(
      localStorage.getItem('users') || '[]'             //get the existing user
    );                                                     

    const existingUser = users.find(
      (user) => user.email === email                    //find: search for matching item,return the first matching item.
    );

    if (existingUser) {
      setMessage('Email already registered');
      return;
    }

    const newUser = {
      name: name,
      email: email,
      password: password
    };

    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));

    setMessage('Registration successful!');

    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    navigate('/login');
  }

  return (
    <div className="register-page">

      <div className="register-card">

        <div className="register-header">
          <div className="register-icon">💰</div>
          <h2>Create Account</h2>
          <p>Join us and start managing your expenses.</p>
        </div>

        {message && (
          <p className="register-message" role="alert">
            {message}
          </p>
        )}

        <form onSubmit={handleRegister}>

          <div className="register-field">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={fetchName}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="register-field">
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

          <div className="register-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
            />
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>

        </form>

        <div className="register-actions">
          <p>Already have an account?</p>

          <button
            type="button"
            className="login-btn"
            onClick={() => navigate('/login')}
          >
            Login
          </button>

          <button
            type="button"
            className="home-btn"
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </button>
        </div>

      </div>

      <p className="register-footer">
        Start your journey toward smarter spending.
      </p>

    </div>
  );
}

export default Register;