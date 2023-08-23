// Get DOM elements
const annaEarningsInput = document.getElementById('anna');
const almaEarningsInput = document.getElementById('alma');
const jenniferEarningsInput = document.getElementById('jennifer');
const expensesInput = document.getElementById('expenses');
const calculateButton = document.getElementById('calculateButton');
const resetCacheButton = document.getElementById('resetCacheButton');

// Local Storage keys
const earningsLocalStorageKey = 'earnings';
const expensesLocalStorageKey = 'expenses';

// Load data from Local Storage on page load
loadLocalStorageData();

// Add event listeners
calculateButton.addEventListener('click', calculateAndDisplay);
resetCacheButton.addEventListener('click', resetCache);

function calculateAndDisplay() {
  // Parse input values
  const annaEarnings = parseFloat(annaEarningsInput.value) || 0;
  const almaEarnings = parseFloat(almaEarningsInput.value) || 0;
  const jenniferEarnings = parseFloat(jenniferEarningsInput.value) || 0;
  const expenses = parseFloat(expensesInput.value) || 0;

  // Load previous earnings from Local Storage
  const storedEarnings = JSON.parse(localStorage.getItem(earningsLocalStorageKey)) || {};
  const storedAnnaEarnings = parseFloat(storedEarnings.anna) || 0;
  const storedAlmaEarnings = parseFloat(storedEarnings.alma) || 0;
  const storedJenniferEarnings = parseFloat(storedEarnings.jennifer) || 0;

  // Calculate and display total earnings
  const totalEarnings = storedAnnaEarnings + storedAlmaEarnings + storedJenniferEarnings + annaEarnings + almaEarnings + jenniferEarnings;
  document.getElementById('totalEarnings').textContent = `Total Earnings: ₱${totalEarnings.toFixed(2)}`;

  // Calculate and display net profit
  const netProfit = totalEarnings - expenses;
  document.getElementById('netProfit').textContent = `Net Profit: ₱${netProfit.toFixed(2)}`;

  // Update monthly and yearly earnings in the report tables
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('en-PH');
  document.getElementById('monthlyReportDate').textContent = `Calculation Date: ${formattedDate}`;
  document.getElementById('yearlyReportDate').textContent = `Calculation Date: ${formattedDate}`;

  const monthlyAnnaEarnings = storedAnnaEarnings + annaEarnings;
  const monthlyAlmaEarnings = storedAlmaEarnings + almaEarnings;
  const monthlyJenniferEarnings = storedJenniferEarnings + jenniferEarnings;

  const yearlyAnnaEarnings = monthlyAnnaEarnings * 12;
  const yearlyAlmaEarnings = monthlyAlmaEarnings * 12;
  const yearlyJenniferEarnings = monthlyJenniferEarnings * 12;

  document.getElementById('annaMonthlyEarnings').textContent = `₱${monthlyAnnaEarnings.toFixed(2)}`;
  document.getElementById('almaMonthlyEarnings').textContent = `₱${monthlyAlmaEarnings.toFixed(2)}`;
  document.getElementById('jenniferMonthlyEarnings').textContent = `₱${monthlyJenniferEarnings.toFixed(2)}`;

  document.getElementById('annaYearlyEarnings').textContent = `₱${yearlyAnnaEarnings.toFixed(2)}`;
  document.getElementById('almaYearlyEarnings').textContent = `₱${yearlyAlmaEarnings.toFixed(2)}`;
  document.getElementById('jenniferYearlyEarnings').textContent = `₱${yearlyJenniferEarnings.toFixed(2)}`;

  // Save updated input values to Local Storage
  const updatedEarnings = {
    anna: monthlyAnnaEarnings,
    alma: monthlyAlmaEarnings,
    jennifer: monthlyJenniferEarnings
  };

  localStorage.setItem(earningsLocalStorageKey, JSON.stringify(updatedEarnings));
  localStorage.setItem(expensesLocalStorageKey, expensesInput.value);
}

function loadLocalStorageData() {
  const storedEarnings = JSON.parse(localStorage.getItem(earningsLocalStorageKey)) || {};

  annaEarningsInput.value = storedEarnings.anna || '';
  almaEarningsInput.value = storedEarnings.alma || '';
  jenniferEarningsInput.value = storedEarnings.jennifer || '';

  expensesInput.value = localStorage.getItem(expensesLocalStorageKey) || '';
}

function saveToLocalStorage() {
  const earnings = {
    anna: annaEarningsInput.value,
    alma: almaEarningsInput.value,
    jennifer: jenniferEarningsInput.value
  };

  localStorage.setItem(earningsLocalStorageKey, JSON.stringify(earnings));
  localStorage.setItem(expensesLocalStorageKey, expensesInput.value);
}

function resetCache() {
  localStorage.removeItem(earningsLocalStorageKey);
  localStorage.removeItem(expensesLocalStorageKey);
  annaEarningsInput.value = '';
  almaEarningsInput.value = '';
  jenniferEarningsInput.value = '';
  expensesInput.value = '';
  document.getElementById('totalEarnings').textContent = 'Total Earnings: ₱0.00';
  document.getElementById('netProfit').textContent = 'Net Profit: ₱0.00';
  document.getElementById('annaMonthlyEarnings').textContent = '₱0.00';
  document.getElementById('almaMonthlyEarnings').textContent = '₱0.00';
  document.getElementById('jenniferMonthlyEarnings').textContent = '₱0.00';
  document.getElementById('annaYearlyEarnings').textContent = '₱0.00';
  document.getElementById('almaYearlyEarnings').textContent = '₱0.00';
  document.getElementById('jenniferYearlyEarnings').textContent = '₱0.00';
  document.getElementById('monthlyReportDate').textContent = '';
  document.getElementById('yearlyReportDate').textContent = '';
}

// Load initial data from Local Storage
loadLocalStorageData();
// Perform initial calculation and display
calculateAndDisplay();
