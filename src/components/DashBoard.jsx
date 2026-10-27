import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

function DashBoard() {
  const navigate = useNavigate();

  const email = localStorage.getItem('loggedInUser');

  function handleLogout() {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  }

  return (
    <div className="dashboard-page">

      {/* Navbar */}
      <nav className="dashboard-navbar">
        <h2>💰 Expense Tracker</h2>

        <button
          className="dashboard-logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      {/* Welcome Section */}
      <section className="dashboard-hero">
        <div className="dashboard-welcome">
          <p className="dashboard-tagline">
            YOUR FINANCIAL JOURNEY
          </p>

          <h1>
            Welcome to your <span>Dashboard!</span>
          </h1>

          <p className="dashboard-description">
            Take control of your money, track your spending,
            and build better financial habits every day.
          </p>

          <div className="dashboard-user">
            <div className="dashboard-avatar">👤</div>

            <div>
              <p className="dashboard-user-label">Logged in as</p>
              <p className="dashboard-email">{email}</p>
            </div>
          </div>

          <button
            className="dashboard-manage-btn"
            onClick={() => navigate('/expenses')}
          >
            Manage Expenses →
          </button>
        </div>

        {/* Expense Illustration */}
        <div className="dashboard-preview">
          <div className="dashboard-money-icon">💵</div>

          <h2>Manage Your Money</h2>
          <p className="dashboard-preview-text">
            Every rupee counts!
          </p>

          <div className="dashboard-expense-item">
            <span>🍔 Food</span>
            <span>Track spending</span>
          </div>

          <div className="dashboard-expense-item">
            <span>🚌 Transport</span>
            <span>Save money</span>
          </div>

          <div className="dashboard-expense-item">
            <span>🏠 Bills</span>
            <span>Stay organized</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="dashboard-features">

        <div className="dashboard-feature-card">
          <div className="dashboard-feature-icon">📊</div>
          <h3>Track Expenses</h3>
          <p>
            Keep your daily expenses organized in one place.
          </p>
        </div>

        <div className="dashboard-feature-card">
          <div className="dashboard-feature-icon">🎯</div>
          <h3>Control Spending</h3>
          <p>
            Understand where your money goes and spend wisely.
          </p>
        </div>

        <div className="dashboard-feature-card">
          <div className="dashboard-feature-icon">💰</div>
          <h3>Build Savings</h3>
          <p>
            Develop better financial habits for your future.
          </p>
        </div>

      </section>

      <footer className="dashboard-footer">
        © 2026 Expense Tracker. Spend wisely. Save more.
      </footer>

    </div>
  );
}

export default DashBoard;