function getStorageKey() {
  const email = localStorage.getItem('loggedInUser');

  if (!email) {
    return null;
  }

  return `expenses_${email.toLowerCase()}`;
}

export function getExpenses() {
  const key = getStorageKey();

  if (!key) {
    return [];
  }

  return JSON.parse(localStorage.getItem(key) || '[]');
}

export function addExpense(expense) {
  const key = getStorageKey();

  if (!key) {
    return;
  }

  const expenses = getExpenses();

  expenses.push(expense);

  localStorage.setItem(key, JSON.stringify(expenses));
}

export function updateExpense(updatedExpense) {
  const key = getStorageKey();

  if (!key) {
    return;
  }

  const expenses = getExpenses();

  const updatedExpenses = expenses.map((expense) =>
    expense.id === updatedExpense.id
      ? updatedExpense
      : expense
  );

  localStorage.setItem(key, JSON.stringify(updatedExpenses));
}

export function deleteExpense(id) {
  const key = getStorageKey();

  if (!key) {
    return;
  }

  const expenses = getExpenses();

  const updatedExpenses = expenses.filter(
    (expense) => expense.id !== id
  );

  localStorage.setItem(key, JSON.stringify(updatedExpenses));
}