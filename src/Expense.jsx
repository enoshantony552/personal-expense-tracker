
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense
} from './services/ExpenseService';

import './Expense.css';

function Expense() {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Selected date for filtering
  const [filterDate, setFilterDate] = useState('');

  // Today's date in YYYY-MM-DD format
  const now = new Date();

  const today = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  // Load expenses when the page opens
  useEffect(() => {
    setExpenses(getExpenses());
  }, []);

  // Edit an expense
  function handleEdit(expense) {
    setEditingId(expense.id);
    setTitle(expense.title);
    setAmount(String(expense.amount));
    setCategory(expense.category);
    setDate(expense.date);
  }

  // Add or update an expense
  function handleAddExpense(e) {
    e.preventDefault();

    if (!title.trim() || !amount || !category || !date) {
      alert('Please fill all fields');
      return;
    }

    if (date > today) {
      alert('Future dates are not allowed');
      return;
    }

    if (
      !Number.isFinite(Number(amount)) ||  //checks whether the converted value is a valid, finite number
      Number(amount) <= 0                  //This checks whether the amount is zero or negative.
    ) {
      alert('Amount must be greater than zero');
      return;
    }

    if (editingId !== null) {
      const updatedExpense = {
        id: editingId,
        title: title.trim(),
        amount: Number(amount),
        category,
        date
      };

      updateExpense(updatedExpense);
    } else {
      const newExpense = {
        id: Date.now(),   //generate a new ID for each expense item.
        title: title.trim(),
        amount: Number(amount),
        category,                          //category is shorthand for category: category
        date
      };

      addExpense(newExpense);
    }

    // Refresh the expense list
    setExpenses(getExpenses());

    // Clear the form
    setTitle('');
    setAmount('');
    setCategory('');
    setDate('');
    setEditingId(null);
  }

  // Delete an expense
  function handleDelete(id) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this expense?'
    );

    if (confirmDelete) {
      deleteExpense(id);
      setExpenses(getExpenses());
    }
  }

  // Cancel editing
  function handleCancel() {
    setTitle('');
    setAmount('');
    setCategory('');
    setDate('');
    setEditingId(null);
  }

  // Logout
  function handleLogout() {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  }

  // Show only expenses matching the selected date
  const filteredExpenses = filterDate
    ? expenses.filter(
        (expense) => expense.date === filterDate
      )
    : [];

  return (
    <div className="expense-page">
      {/* Header */}
      <header className="expense-header">
        <h1>Personal Expense Tracker</h1>

        <nav className="page-navigation">
          <button
            type="button"
            onClick={() => navigate('/expenses')}
          >
            Manage Expenses
          </button>

          <button
            type="button"
            onClick={() => navigate('/reports')}
          >
            Monthly Reports
          </button>

          <button
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Add / Edit Expense Form */}
      <section className="expense-form-section">
        <h2>
          {editingId !== null
            ? 'Edit Expense'
            : 'Add Expense'}
        </h2>

        <form onSubmit={handleAddExpense}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Example: Lunch"
              required
            />
          </div>

          <div>
            <label htmlFor="amount">Amount (₹)</label>
            <input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="expenseDate">Date</label>
            <input
              id="expenseDate"
              type="date"
              value={date}
              max={today}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <button type="submit">
            {editingId !== null
              ? 'Update Expense'
              : 'Add Expense'}
          </button>

          {editingId !== null && (
            <button
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </form>
      </section>

      {/* Date Filter */}
      <section className="expense-list-section">
        <h2>Filter Expenses by Date</h2>

        <div className="date-filter">
          <label htmlFor="filterDate">
            Select Date
          </label>

          <input
            id="filterDate"
            type="date"
            value={filterDate}
            max={today}
            onChange={(e) => setFilterDate(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setFilterDate('')}
          >
            Clear Date
          </button>
        </div>

        {/* Show results only after selecting a date */}
        {filterDate && (
          <>
            <h3>Expenses on {filterDate}</h3>

            {filteredExpenses.length === 0 ? (
              <p>No expenses found for this date.</p>
            ) : (
              <div className="expense-table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Amount</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredExpenses.map((expense) => (
                      <tr key={expense.id}>
                        <td>{expense.title}</td>

                        <td>
                          ₹{Number(expense.amount).toFixed(2)}
                        </td>

                        <td>{expense.category}</td>
                        <td>{expense.date}</td>

                        <td>
                          <button
                            type="button"
                            onClick={() => handleEdit(expense)}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(expense.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default Expense;
