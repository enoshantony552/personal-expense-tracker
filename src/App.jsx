import logo from './logo.svg';
import './App.css';
import Registration from './components/Registration';
import Login from './components/Login';
import Home from './components/Home';
import DashBoard from './components/DashBoard';
import { BrowserRouter as Router, Route, Routes, Form } from 'react-router-dom';
import { useState } from 'react';
import Expense from './Expense';
import MonthlyReport from './MonthlyReport';
import MonthComparison from './MonthComparison';
function App() {
  return (
    <>
    
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/expenses" element={<Expense />} />
      <Route path="/expenses" element={<Expense />} />
      <Route path="/reports" element={<MonthlyReport />} /> 
      <Route path="/compare-months" element={<MonthComparison />}
/>
       
    </Routes>
    </Router>
    </>
  );
}

export default App;