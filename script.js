const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const swapButton = document.getElementById('swapButton');
const convertButton = document.getElementById('convertButton');
const resultDiv = document.getElementById('result');

// Fungsi konversi otomatis
async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  // Mengecek apakah input amount valid
  if (isNaN(amount) || amount <= 0) {
    resultDiv.innerText = 'Please enter a valid amount.';
    return;
  }

  try {
    const apiKey = '3ebe2ccf9eeea2aaef280201';
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }

    const data = await response.json();

    if (data.result === 'success') {
      const rate = data.conversion_rates[to];
      if (rate) {
        const convertedAmount = (amount * rate).toFixed(2);
        resultDiv.innerHTML = `${amount} ${from} = ${convertedAmount} ${to}`;
      } else {
        resultDiv.innerText = 'Error: Invalid currency selected.';
      }
    } else {
      resultDiv.innerText = 'Error: Unable to fetch exchange rates.';
    }
  } catch (error) {
    console.error(error);
    resultDiv.innerText = 'Error fetching exchange rates!';
  }
}

// Fungsi swap mata uang
function swapCurrencies() {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;

  // Langsung konversi setelah swap tanpa tombol Convert
  convertCurrency();
}

// Event listener untuk input perubahan jumlah
amountInput.addEventListener('input', convertCurrency);

// Event listener untuk perubahan mata uang
[fromCurrency, toCurrency].forEach(element => {
  element.addEventListener('change', () => {
    convertCurrency(); // Konversi langsung saat mata uang berubah
  });
});

// Event listener untuk tombol swap
swapButton.addEventListener('click', swapCurrencies);

// Event listener untuk tombol Convert
convertButton.addEventListener('click', convertCurrency);
