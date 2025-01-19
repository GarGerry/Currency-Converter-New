const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const swapButton = document.getElementById('swapButton');
const convertButton = document.getElementById('convertButton');
const resultDiv = document.getElementById('result');

// Status konversi otomatis
let autoConvert = false;

// Tombol convert pertama kali
convertButton.addEventListener('click', async () => {
  autoConvert = true; // Aktifkan konversi otomatis
  await convertCurrency();
  convertButton.style.display = 'none'; // Sembunyikan tombol
});

// Swap mata uang
swapButton.addEventListener('click', async () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;

  // Langsung konversi ulang jika swap dilakukan
  await convertCurrency();
});

// Input perubahan jumlah
amountInput.addEventListener('input', async () => {
  if (autoConvert) {
    await convertCurrency(); // Konversi otomatis
  }
});

// Perubahan mata uang
[fromCurrency, toCurrency].forEach(element => {
  element.addEventListener('change', () => {
    // Reset status jika mata uang diubah
    autoConvert = false;
    convertButton.style.display = 'block'; // Tampilkan tombol Convert
    resultDiv.innerHTML = ''; // Kosongkan hasil
  });
});

// Fungsi konversi
async function convertCurrency() {
  const amount = amountInput.value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || amount <= 0) {
    resultDiv.innerHTML = 'Please enter a valid amount.';
    return;
  }

  try {
    const apiKey = '3ebe2ccf9eeea2aaef280201';
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.result === 'success') {
      const rate = data.conversion_rates[to];
      const convertedAmount = (amount * rate).toFixed(2);
      resultDiv.innerHTML = `${amount} ${from} = ${convertedAmount} ${to}`;
    } else {
      resultDiv.innerHTML = `Error: ${data['error-type']}`;
    }
  } catch (error) {
    resultDiv.innerHTML = 'Error fetching conversion rate.';
    console.error(error);
  }
}
