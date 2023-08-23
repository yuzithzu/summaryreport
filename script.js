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

  // Load previous cumulative earnings from Local Storage
  const storedEarnings = JSON.parse(localStorage.getItem(earningsLocalStorageKey)) || {};
  const storedAnnaEarnings = parseFloat(storedEarnings.anna) || 0;
  const storedAlmaEarnings = parseFloat(storedEarnings.alma) || 0;
  const storedJenniferEarnings = parseFloat(storedEarnings.jennifer) || 0;

  // Calculate cumulative earnings
  const cumulativeAnnaEarnings = storedAnnaEarnings + annaEarnings;
  const cumulativeAlmaEarnings = storedAlmaEarnings + almaEarnings;
  const cumulativeJenniferEarnings = storedJenniferEarnings + jenniferEarnings;

  // Calculate total earnings for each person
  const totalAnnaEarnings = cumulativeAnnaEarnings;
  const totalAlmaEarnings = cumulativeAlmaEarnings;
  const totalJenniferEarnings = cumulativeJenniferEarnings;

  // Calculate and display total earnings
  const totalEarnings = totalAnnaEarnings + totalAlmaEarnings + totalJenniferEarnings;
  document.getElementById('totalEarnings').textContent = `Total Earnings: ₱${totalEarnings.toFixed(2)}`;

  // Calculate and display net profit
  const netProfit = totalEarnings - expenses;
  document.getElementById('netProfit').textContent = `Net Profit: ₱${netProfit.toFixed(2)}`;

  // Calculate and display monthly and yearly earnings for each person
  const monthlyAnnaEarnings = annaEarnings;
  const monthlyAlmaEarnings = almaEarnings;
  const monthlyJenniferEarnings = jenniferEarnings;

  const yearlyAnnaEarnings = cumulativeAnnaEarnings * 12;
  const yearlyAlmaEarnings = cumulativeAlmaEarnings * 12;
  const yearlyJenniferEarnings = cumulativeJenniferEarnings * 12;

  // Update monthly earnings in the summary
  document.getElementById('annaMonthlyEarnings').textContent = `₱${monthlyAnnaEarnings.toFixed(2)}`;
  document.getElementById('almaMonthlyEarnings').textContent = `₱${monthlyAlmaEarnings.toFixed(2)}`;
  document.getElementById('jenniferMonthlyEarnings').textContent = `₱${monthlyJenniferEarnings.toFixed(2)}`;

  // Update yearly earnings in the summary
  document.getElementById('annaYearlyEarnings').textContent = `₱${yearlyAnnaEarnings.toFixed(2)}`;
  document.getElementById('almaYearlyEarnings').textContent = `₱${yearlyAlmaEarnings.toFixed(2)}`;
  document.getElementById('jenniferYearlyEarnings').textContent = `₱${yearlyJenniferEarnings.toFixed(2)}`;

  // Save updated cumulative earnings to Local Storage
  const updatedCumulativeEarnings = {
    anna: cumulativeAnnaEarnings,
    alma: cumulativeAlmaEarnings,
    jennifer: cumulativeJenniferEarnings
  };

  localStorage.setItem(earningsLocalStorageKey, JSON.stringify(updatedCumulativeEarnings));
  localStorage.setItem(expensesLocalStorageKey, expensesInput.value);
}

function loadLocalStorageData() {
  const storedEarnings = JSON.parse(localStorage.getItem(earningsLocalStorageKey)) || {};

  annaEarningsInput.value = storedEarnings.anna || '';
  almaEarningsInput.value = storedEarnings.alma || '';
  jenniferEarningsInput.value = storedEarnings.jennifer || '';

  expensesInput.value = localStorage.getItem(expensesLocalStorageKey) || '';
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
  document.getElementById('annaYearlyEarnings').textContent = '₱0.00';
  document.getElementById('almaYearlyEarnings').textContent = '₱0.00';
  document.getElementById('jenniferYearlyEarnings').textContent = '₱0.00';
  document.getElementById('annaMonthlyEarnings').textContent = '₱0.00';
  document.getElementById('almaMonthlyEarnings').textContent = '₱0.00';
  document.getElementById('jenniferMonthlyEarnings').textContent = '₱0.00';
  document.getElementById('monthlyReportDate').textContent = '';
  document.getElementById('yearlyReportDate').textContent = '';
}

// Load initial data from Local Storage
loadLocalStorageData();
// Perform initial calculation and display
calculateAndDisplay();
