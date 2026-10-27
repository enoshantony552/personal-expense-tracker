
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getExpenses } from './services/ExpenseService';
import './Expense.css';

function MonthComparison() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);

  const now = new Date();

  const currentMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, '0')}`;

  // Default comparison month is the previous month
  const previousDate = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  );

  const defaultMonth = `${previousDate.getFullYear()}-${String(
    previousDate.getMonth() + 1
  ).padStart(2, '0')}`;

  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

  useEffect(() => {
    setExpenses(getExpenses());
  }, []);

  // Dropdown options: 24 previous months
  const monthOptions = [];

  for (let i = 1; i <= 24; i++) {
    const d = new Date(
      now.getFullYear(),
      now.getMonth() - i,
      1
    );

    const value = `${d.getFullYear()}-${String(
      d.getMonth() + 1
    ).padStart(2, '0')}`;

    monthOptions.push({
      value,
      label: d.toLocaleString('en-IN', {
        month: 'long',
        year: 'numeric'
      })
    });
  }

  function getMonthName(month) {
    const [year, monthNumber] = month.split('-');

    return new Date(
      Number(year),
      Number(monthNumber) - 1,
      1
    ).toLocaleString('en-IN', {
      month: 'long',
      year: 'numeric'
    });
  }

  // Current month expenses
  const currentExpenses = expenses.filter(
    (expense) => expense.date.startsWith(currentMonth)
  );

  // Expenses for the month selected in the dropdown
  const selectedExpenses = expenses.filter(
    (expense) => expense.date.startsWith(selectedMonth)
  );

  function calculateTotal(list) {
    return list.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );
  }

  const currentTotal = calculateTotal(currentExpenses);
  const selectedTotal = calculateTotal(selectedExpenses);

  function calculateCategoryTotals(list) {
    return list.reduce((totals, expense) => {
      totals[expense.category] =
        (totals[expense.category] || 0) +
        Number(expense.amount);

      return totals;
    }, {});
  }

  const currentCategories =
    calculateCategoryTotals(currentExpenses);

  const selectedCategories =
    calculateCategoryTotals(selectedExpenses);

  const allCategories = [
    ...new Set([
      ...Object.keys(currentCategories),
      ...Object.keys(selectedCategories)
    ])
  ];

  const difference = currentTotal - selectedTotal;

  return (
    <div className="expense-page">
      <nav className="page-navigation">
        <button
          type="button"
          onClick={() => navigate('/reports')}
        >
          Back to Monthly Reports
        </button>

        <button
          type="button"
          onClick={() => navigate('/expenses')}
        >
          Manage Expenses
        </button>
      </nav>

      <h1>Month Comparison</h1>

      <section className="report-section">
        <h2>Choose a Month to Compare</h2>

        <p>
          Current month: <strong>{getMonthName(currentMonth)}</strong>
        </p>

        <label htmlFor="compareMonth">
          Select another month:
        </label>

        <select
          id="compareMonth"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {monthOptions.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </section>

      <div className="report-summary">
        <div className="summary-card">
          <p>{getMonthName(currentMonth)}</p>
          <h2>₹{currentTotal.toFixed(2)}</h2>
          <p>{currentExpenses.length} transactions</p>
        </div>

        <div className="summary-card">
          <p>{getMonthName(selectedMonth)}</p>
          <h2>₹{selectedTotal.toFixed(2)}</h2>
          <p>{selectedExpenses.length} transactions</p>
        </div>

        <div className="summary-card">
          <p>Spending Difference</p>

          <h2>
            {difference > 0 ? '+' : difference < 0 ? '-' : ''}
            ₹{Math.abs(difference).toFixed(2)}
          </h2>

          <p>
            {difference > 0
              ? 'You spent more this month.'
              : difference < 0
              ? 'You spent less this month.'
              : 'Spending is equal.'}
          </p>
        </div>
      </div>

      <section className="report-section">
        <h2>Category-wise Comparison</h2>

        {allCategories.length === 0 ? (
          <p>No expenses found in either month.</p>
        ) : (
          <div className="expense-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>{getMonthName(currentMonth)}</th>
                  <th>{getMonthName(selectedMonth)}</th>
                  <th>Difference</th>
                  <th>Result</th>
                </tr>
              </thead>

              <tbody>
                {allCategories.map((name) => {
                  const currentAmount =
                    currentCategories[name] || 0;

                  const selectedAmount =
                    selectedCategories[name] || 0;

                  const categoryDifference =
                    currentAmount - selectedAmount;

                  return (
                    <tr key={name}>
                      <td>{name}</td>

                      <td>₹{currentAmount.toFixed(2)}</td>

                      <td>₹{selectedAmount.toFixed(2)}</td>

                      <td>
                        {categoryDifference > 0 ? '+' : categoryDifference < 0 ? '-' : ''}
                        ₹{Math.abs(categoryDifference).toFixed(2)}
                      </td>

                      <td>
                        {categoryDifference > 0
                          ? 'Increased'
                          : categoryDifference < 0
                          ? 'Decreased'
                          : 'No change'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="report-section">
        <h2>Spending Insight</h2>

        <p>
          {difference > 0
            ? `You spent ₹${difference.toFixed(2)} more in ${getMonthName(currentMonth)} than in ${getMonthName(selectedMonth)}.`
            : difference < 0
            ? `You spent ₹${Math.abs(difference).toFixed(2)} less in ${getMonthName(currentMonth)} than in ${getMonthName(selectedMonth)}.`
            : 'Your total spending was the same in both months.'}
        </p>
      </section>
    </div>
  );
}

export default MonthComparison;
