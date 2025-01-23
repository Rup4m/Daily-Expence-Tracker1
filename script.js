const expenseForm = document.getElementById('expense-form');
const expenseTable = document.getElementById('expense-table').querySelector('tbody');
const totalExpensesElement = document.getElementById('total-expenses');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function updateExpenses() {
  expenseTable.innerHTML = '';
  let total = 0;
  expenses.forEach((expense, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.date}</td>
      <td>${expense.category}</td>
      <td>$${expense.amount}</td>
      <td>${expense.description}</td>
      <td>
        <button onclick="deleteExpense(${index})">Delete</button>
      </td>
    `;
    expenseTable.appendChild(row);
    total += parseFloat(expense.amount);
  });
  totalExpensesElement.textContent = total.toFixed(2);
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  updateExpenses();
}

expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value;
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;

  if (date && category && amount) {
    expenses.push({ date, category, amount, description });
    updateExpenses();
    expenseForm.reset();
  }
});

updateExpenses();
