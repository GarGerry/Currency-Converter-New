async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const result = document.getElementById('result');
    const convertBtn = document.getElementById('convert-btn');

    // Mengecek apakah input amount valid
    if (isNaN(amount) || amount <= 0) {
        result.innerText = "Please enter a valid amount.";
        return; // Menghentikan proses jika input jumlah tidak valid
    }

    // Menyembunyikan tombol Convert jika amount sudah diinput
    convertBtn.style.display = 'none';

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
    }
}

function swapCurrencies() {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    
    // Swap currency values
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    // Langsung konversi setelah swap tanpa tombol Convert
    convertCurrency();
}

// Event listeners for input and currency change
document.getElementById('amount').addEventListener('input', () => {
    convertCurrency(); // Konversi otomatis langsung saat amount diubah
});

document.getElementById('from-currency').addEventListener('change', () => {
    document.getElementById('convert-btn').style.display = 'block'; // Tombol Convert muncul
    document.getElementById('result').innerHTML = ''; // Kosongkan hasil konversi
});

document.getElementById('to-currency').addEventListener('change', () => {
    document.getElementById('convert-btn').style.display = 'block'; // Tombol Convert muncul
    document.getElementById('result').innerHTML = ''; // Kosongkan hasil konversi
});

// Tombol Convert ditekan untuk pertama kali
document.getElementById('convert-btn').addEventListener('click', () => {
    convertCurrency();
});
