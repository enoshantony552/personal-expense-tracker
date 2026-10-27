
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseCharts from './ExpenseCharts';
import { getExpenses } from './services/ExpenseService';
import './Expense.css';

function MonthlyReport() {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);

  const [reportMonth, setReportMonth] = useState(() => {
    const now = new Date();

    return `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, '0')}`;
  });

  // Get the current month in YYYY-MM format
  const now = new Date();

  const currentMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, '0')}`;

  // Load expenses
  useEffect(() => {
    setExpenses(getExpenses());
  }, []);

  // Expenses for the selected report month
  const monthlyExpenses = expenses.filter((expense) =>
    expense.date.startsWith(reportMonth)
  );

  // Calculate total spending
  const monthlyTotal = monthlyExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  // Calculate spending for each category
  const categoryTotals = monthlyExpenses.reduce(
    (totals, expense) => {
      totals[expense.category] =
        (totals[expense.category] || 0) +
        Number(expense.amount);

      return totals;
    },
    {}
  );

  // Calculate spending for each day
  const dailyTotals = monthlyExpenses.reduce(
    (totals, expense) => {
      totals[expense.date] =
        (totals[expense.date] || 0) +
        Number(expense.amount);

      return totals;
    },
    {}
  );

  // Sort daily spending by date
  const dailyReport = Object.entries(dailyTotals).sort(
    (a, b) => a[0].localeCompare(b[0])
  );

  // Logout
  function handleLogout() {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  }

  return (
    <div className="expense-page">
      {/* Navigation */}
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

      <h1>Monthly Reports</h1>

      <p>
        Review your spending and understand where your money goes.
      </p>

      {/* Select report month */}
      <div className="report-controls">
        <label htmlFor="reportMonth">
          Select Month:
        </label>

        <input
          id="reportMonth"
          type="month"
          value={reportMonth}
          max={currentMonth}
          onChange={(e) => setReportMonth(e.target.value)}
        />
      </div>

      {/* Summary cards */}
      <div className="report-summary">
        <div className="summary-card">
          <p>Total Spent</p>
          <h2>₹{monthlyTotal.toFixed(2)}</h2>
        </div>

        <div className="summary-card">
          <p>Transactions</p>
          <h2>{monthlyExpenses.length}</h2>
        </div>

        <div className="summary-card">
          <p>Categories Used</p>
          <h2>{Object.keys(categoryTotals).length}</h2>
        </div>
      </div>

      {/* Monthly report details */}
      {monthlyExpenses.length === 0 ? (
        <p>No expenses found for this month.</p>
      ) : (
        <>
          {/* Category-wise spending */}
          <section className="report-section">
            <h2>Category-wise Spending</h2>

            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Total Amount</th>
                </tr>
              </thead>

              <tbody>
                {Object.entries(categoryTotals).map(
                  ([name, amount]) => (
                    <tr key={name}>
                      <td>{name}</td>
                      <td>₹{amount.toFixed(2)}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </section>

          {/* Daily spending */}
          <section className="report-section">
            <h2>Daily Spending</h2>

            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Total Spent</th>
                </tr>
              </thead>

              <tbody>
                {dailyReport.map(([day, amount]) => (
                  <tr key={day}>
                    <td>{day}</td>
                    <td>₹{amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Charts */}
          <ExpenseCharts
            expenses={expenses}
            reportMonth={reportMonth}
          />
        </>
      )}

      {/* Compare Months button: only for current month */}
      {reportMonth === currentMonth && (
        <div className="compare-button-section">
          <h2>Compare Your Spending</h2>

          <p>
            Compare this month's spending with any previous month.
          </p>

          <button
            type="button"
            onClick={() => navigate('/compare-months')}
          >
            Compare Months
          </button>
        </div>
      )}
    </div>
  );
}

export default MonthlyReport;
