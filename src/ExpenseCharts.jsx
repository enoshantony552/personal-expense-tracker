
import { Bar, Doughnut } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

import './ExpenseCharts.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

function ExpenseCharts({ expenses, reportMonth }) {
  const monthlyExpenses = expenses.filter((expense) =>
    expense.date.startsWith(reportMonth)
  );

  // Category-wise totals
  const categoryTotals = {};

  monthlyExpenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) +
      Number(expense.amount);
  });

  const colors = [
    '#38bdf8',
    '#a78bfa',
    '#34d399',
    '#fbbf24',
    '#fb7185',
    '#2dd4bf'
  ];

  const categoryData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Amount Spent',
        data: Object.values(categoryTotals),
        backgroundColor: colors,
        borderColor: '#101b33',
        borderWidth: 3,
        hoverOffset: 10
      }
    ]
  };

  // Daily totals
  const dailyTotals = {};

  monthlyExpenses.forEach((expense) => {
    dailyTotals[expense.date] =
      (dailyTotals[expense.date] || 0) +
      Number(expense.amount);
  });

  const sortedDates = Object.keys(dailyTotals).sort();

  const dailyData = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Daily Spending',
        data: sortedDates.map((day) => dailyTotals[day]),
        backgroundColor: '#38bdf8',
        hoverBackgroundColor: '#7dd3fc',
        borderRadius: 7,
        borderSkipped: false,
        maxBarThickness: 45
      }
    ]
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 700
    },
    plugins: {
      legend: {
        labels: {
          color: '#dbeafe',
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: '#0b1730',
        titleColor: '#ffffff',
        bodyColor: '#dbeafe',
        borderColor: '#334b70',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context) =>
            ` ₹${Number(context.raw).toFixed(2)}`
        }
      }
    }
  };

  const doughnutOptions = {
    ...commonOptions,
    cutout: '68%',
    plugins: {
      ...commonOptions.plugins,
      legend: {
        ...commonOptions.plugins.legend,
        position: 'bottom'
      }
    }
  };

  const barOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#cbd5e1',
          maxRotation: 45,
          minRotation: 0
        },
        grid: {
          display: false
        },
        title: {
          display: true,
          text: 'Date',
          color: '#94a3b8'
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#cbd5e1',
          callback: (value) => `₹${value}`
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.13)'
        },
        title: {
          display: true,
          text: 'Amount Spent',
          color: '#94a3b8'
        }
      }
    }
  };

  const monthlyTotal = monthlyExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  if (monthlyExpenses.length === 0) {
    return (
      <section className="expense-charts">
        <div className="charts-heading">
          <h2>Spending Analytics</h2>
          <p>Understand your spending habits at a glance.</p>
        </div>

        <div className="chart-empty">
          <h3>No spending data yet</h3>
          <p>
            Add expenses for the selected month to see your charts.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="expense-charts">
      <div className="charts-heading">
        <div>
          <span className="charts-eyebrow">
            FINANCIAL OVERVIEW
          </span>
          <h2>Spending Analytics</h2>
          <p>Understand your spending habits at a glance.</p>
        </div>

        <div className="charts-total">
          <span>Total spent this month</span>
          <strong>₹{monthlyTotal.toFixed(2)}</strong>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <div className="chart-title">
            <h3>Spending by Category</h3>
            <p>Where your money goes</p>
          </div>

          <div className="doughnut-wrapper">
            <Doughnut
              data={categoryData}
              options={doughnutOptions}
            />
          </div>
        </div>

        <div className="chart-container daily-chart">
          <div className="chart-title">
            <h3>Daily Spending</h3>
            <p>Your spending pattern throughout the month</p>
          </div>

          <div className="bar-wrapper">
            <Bar
              data={dailyData}
              options={barOptions}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExpenseCharts;
