async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const result = document.getElementById('result');
    const convertBtn = document.getElementById('convert-btn');

    // Mengecek apakah input amount valid
    if (isNaN(amount) || amount <= 0) {
        result.innerText = "Please enter a valid amount.";
        convertBtn.style.display = 'block';
        return; // Menghentikan proses jika input jumlah tidak valid
    }

    if (fromCurrency && toCurrency) {
        try {
            console.log(`Fetching data for ${fromCurrency}`);
            const response = await fetch(`https://v6.exchangerate-api.com/v6/3ebe2ccf9eeea2aaef280201/latest/${fromCurrency}`);
            console.log('Response status:', response.status); // Menampilkan status respons
            
            if (!response.ok) {
                throw new Error('Failed to fetch exchange rates');
            }

            const data = await response.json();
            console.log('API response data:', data); // Menampilkan data respons

            if (data.result === "success") {
                const rate = data.conversion_rates[toCurrency];
                if (rate) {
                    const convertedAmount = (amount * rate).toFixed(2);
                    result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
                    convertBtn.style.display = 'none'; // Hide convert button after conversion
                } else {
                    result.innerText = "Error: Invalid currency selected.";
                }
            } else {
                result.innerText = "Error: Unable to fetch exchange rates.";
            }
        } catch (error) {
            console.error(error);
            result.innerText = "Error fetching exchange rates!";
        }
    } else {
        result.innerHTML = ''; // Clear result if input is incomplete
        convertBtn.style.display = 'block'; // Ensure the convert button is visible
    }
}

function swapCurrencies() {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');

    // Swap currency values
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    // Automatically convert after swap
    convertCurrency();
}

// Event listeners for input and currency change
document.getElementById('amount').addEventListener('input', convertCurrency);

document.getElementById('from-currency').addEventListener('change', () => {
    document.getElementById('convert-btn').style.display = 'block'; // Ensure button shows again
    document.getElementById('result').innerHTML = ''; // Clear result
});

document.getElementById('to-currency').addEventListener('change', () => {
    document.getElementById('convert-btn').style.display = 'block'; // Ensure button shows again
    document.getElementById('result').innerHTML = ''; // Clear result
});
